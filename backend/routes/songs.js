const express = require("express");
const router = express.Router();

const { Song, Album, User } = require("../db/models");

const { requireAuth } = require("../utils/auth.js");

// Get all Songs
router.get("/songs", async (req, res) => {
  const songs = await Song.findAll();
  res.json(songs);
});

// Get details by song Id 298
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

  res.json({ song });
});

// Edit a song 423 TRUE (CURRENT USER)
router.put("/songs/:songId", requireAuth, async (req, res) => {
  const { user } = req;
  const { songId } = req.params;
  const { title, description, url, imageUrl } = req.body;

  const song = await Song.findByPk(songId);

  if (!song) {
    const error = new Error("Song not found");
    error.status(404);
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
    } else {
      const error = new Error("Validation error: Not Authorized");
      error.status(401);
      throw error;
    }
  }
});

// Delete a Song 495 TRUE (CURRENT USER)
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
    } else {
      const error = new Error("Validation error: Unauthorized");
      error.status = 401;
      throw error;
    }
  } else {
    const error = new Error("Song not found");
    error.status = 404;
    throw error;
  }
});

// Get all Comments by Song ID 814

// Create a Comment for a song by Song ID 862 TRUE

// Add Query Filters to get All Songs 1501

module.exports = router;
