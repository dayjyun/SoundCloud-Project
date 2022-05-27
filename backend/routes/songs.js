const express = require("express");
const router = express.Router();

const { requireAuth } = require("../utils/auth.js");
const { validateSong, validateComment, validatePage } = require("../utils/validation");

const { Song, Album, User, Comment, sequelize } = require("../db/models");

// GET

// Get All Comments By Song ID
router.get("/:songId/comments", async (req, res) => {
  const { songId } = req.params;
  const song = await Song.findByPk(songId, {
    include: [
      {
        model: Comment,
        include: [{ model: User, attributes: ["id", "username"] }],
      },
    ],
  });

  if (song) {
    res.json({ Comments: song.Comments });
  } else {
    const error = new Error("Song not found");
    error.status = 404;
    throw error;
  }
});

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
      [sequelize.col("Song.imageUrl"), "previewImage"],
    ],
    include: [
      {
        model: User,
        as: "Artist",
        attributes: [
          "id",
          "username",
          [sequelize.col("imageUrl"), "previewImage"],
        ],
      },
      {
        model: Album,
        attributes: [
          "id",
          "title",
          [sequelize.col("imageUrl"), "previewImage"],
        ],
      },
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
router.get("/", validatePage, async (req, res) => {
  let { page, size, title, createdAt } = req.query;
  if (page) page = parseInt(page);
  if (size) size = parseInt(size);

  const where = {}; // search filters (title, createdAt)
  const pag = {}; // (page, size)

  if (!page) page = 0;
  if (!size) size = 20;

  if (page > 10) {
    page = 0;
  } else {
    page = page;
  }

  if (size > 20) {
    size = 20;
  } else {
    size = size;
  }

  if (createdAt) where.created = createdAt;
  if (title) where.title = title;

  if (page > 0) {
    pag.limit = size;
    pag.offset = size * (page - 1)
  } else {
    pag.limit = size;
  };

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
    ],
    where: { ...where },
    ...pag,
  });
  res.json({ Songs, page, size });
});

// POST

// Create A Comment For A Song By Song ID
router.post(
  "/:songId/comments",
  requireAuth,
  validateComment,
  async (req, res) => {
    const { user } = req;
    const { songId } = req.params;
    const { body } = req.body;

    const song = await Song.findByPk(songId);

    if (song) {
      const comment = await Comment.create({
        body,
        songId,
        userId: user.id,
      });
      res.json(comment);
    } else {
      const error = new Error("Song not found");
      error.status = 404;
      throw error;
    }
  }
);

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
    } else {
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
    }
  } else {
    const error = new Error("Song not found");
    error.status = 404;
    throw error;
  }
});

module.exports = router;
