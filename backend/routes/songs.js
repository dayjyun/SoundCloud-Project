const express = require("express");
const router = express.Router();

const { requireAuth } = require("../utils/auth.js");
const { validateSong, validateCommentBody } = require('../utils/validation')

const { Song, Album, User, Comment } = require("../db/models");

// GET

// Get All Comments By Song ID
router.get('/songs/:songId/comments', async(req, res) => {
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

// Get Details By Song ID ***
router.get("/songs/:songId", async (req, res) => {
  const { songId } = req.params;
  const song = await Song.findByPk(songId, {
    include: [
      { model: User, as: "Artist", attributes: ["id", "username", "imageUrl"] },
      { model: Album, attributes: ["id", "title", "imageUrl"] },
    ],
  });

  if (!song) {
    const error = new Error("Song not found");
    error.status = 404;
    throw error;
  }

  res.json(song);
});

// Get All Songs ***
router.get("/songs", async (req, res) => {
  const { imageUrl } = req.body;
  const Songs = await Song.findAll({
    // previewImage: imageUrl
  });
  res.json({ Songs });
});

// POST

// Create A Comment For A Song By Song ID
router.post("/songs/:songId/comments", requireAuth, validateCommentBody, async(req, res) => {
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

// Edit A Song *** !!!
router.put("/songs/:songId", requireAuth, validateSong, async (req, res) => {
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

      res.json(song);
    }
  }
});

// DELETE

// Delete A Song
router.delete("/songs/:songId", requireAuth, async (req, res, next) => {
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
    }
  } else {
    const error = new Error("Song not found");
    error.status = 404;
    throw error;
  }
});

// Add Query Filters to get All Songs 1501

module.exports = router;
