const express = require("express");
const router = express.Router();

const { requireAuth } = require("../utils/auth.js");
const { validateSong, validateComment } = require("../utils/validation");

const { Song, Album, User, Comment, sequelize } = require("../db/models");

// GET

// Get All Comments By Song ID
router.get('/:songId/comments', async(req, res) => {
  const { songId } = req.params;
  const song = await Song.findByPk(songId, {
    include: [
      { model: Comment,
        include: [
          {model: User, attributes: ["id", "username"]}
        ]
      }
    ]
  });

  if(song) {
    res.json({ Comments: song.Comments })
  } else {
    const error = new Error("Song not found");
    error.status = 404;
    throw error;
  }
})

// Get Details By Song ID
router.get("/:songId", async (req, res) => {
  const { songId } = req.params;
  const song = await Song.findByPk(songId, {
    attributes: [
      "id",
      "userId",
      "albumId",
      "title",
      "description",
      "url",
      "createdAt",
      "updatedAt",
      [sequelize.col("Song.imageUrl"), "previewImage"]
    ],
    include: [
      { model: User, as: "Artist", attributes: [
        "id",
        "username",
        [sequelize.col("imageUrl"), "previewImage"]
      ]},
      { model: Album, attributes: [
        "id",
        "title",
        [sequelize.col("imageUrl"), "previewImage"]
      ]},
    ],
  });

  if (!song) {
    const error = new Error("Song not found");
    error.status = 404;
    throw error;
  }

  res.json(song);
});

// Get All Songs
router.get("/", async (req, res) => {
  const Songs = await Song.findAll({
    attributes: [
      "id",
      "userId",
      "albumId",
      "title",
      "description",
      "url",
      "createdAt",
      "updatedAt",
      [sequelize.col("Song.imageUrl"), "previewImage"],
    ]
  });
  res.json({ Songs });
});

// POST

// Create A Comment For A Song By Song ID
router.post("/:songId/comments", requireAuth, validateComment, async(req, res) => {
  const { user } = req;
  const { songId } = req.params;
  const { body } = req.body;

  const song = await Song.findByPk(songId)

  if(song) {
    const comment = await Comment.create({
      body,
      songId,
      userId: user.id,
    })
    res.json(comment)
  } else {
    const error = new Error("Song not found");
    error.status = 404;
    throw error;
  }
})

// PUT

// Edit A Song
router.put("/:songId", requireAuth, validateSong, async (req, res) => {
  const { user } = req;
  const { songId } = req.params;
  const { title, description, url, imageUrl } = req.body;

  const song = await Song.findByPk(songId);

  if (!song) {
    const error = new Error("Song not found");
    error.status = 404;
    throw error;
  } else {
    if (song.userId === user.id) {
      await song.update({
        title,
        description,
        url,
        imageUrl,
      });

      song.dataValues.previewImage = imageUrl;
      delete song.dataValues.imageUrl;

      res.json(song);
    }  else {
        const error = Error("Unauthorized");
        error.status = 403;
        throw error;
    }
  }
});

// DELETE

// Delete A Song
router.delete("/:songId", requireAuth, async (req, res, next) => {
  const { user } = req;
  const { songId } = req.params;

  const song = await Song.findByPk(songId);

  if (song) {
    if (song.userId === user.id) {
      await song.destroy();
      res.json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    } else {
      const error = new Error("Unauthorized");
      error.status = 403;
      throw error;
    };
  } else {
    const error = new Error("Song not found");
    error.status = 404;
    throw error;
  };
});

// Add Query Filters to get All Songs 1501

module.exports = router;
