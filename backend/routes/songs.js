const express = require("express");
const router = express.Router();

const { Song, Album, User, Comment } = require("../db/models");

const { requireAuth } = require("../utils/auth.js");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../utils/validation");

const validateSong = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Song title is required"),
  check("url").exists({ checkFalsy: true }).withMessage("Audio is required"),
  handleValidationErrors,
];

// GET

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
    res.json({
      message: "Song not found",
      statusCode: 404,
    });
  }

  res.json(song);
});

// Get all Songs
router.get("/songs", async (req, res) => {
  const Songs = await Song.findAll();
  res.json({ Songs });
});

// Edit a song 423 TRUE (CURRENT USER)
router.put("/songs/:songId", requireAuth, validateSong, async (req, res) => {
  const { user } = req;
  const { songId } = req.params;
  const { title, description, url, imageUrl } = req.body;

  const song = await Song.findByPk(songId);

  if (!song) {
    res.json({
      message: "Song not found",
      statusCode: 404,
    });
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
    }
  } else {
    res.json({
      message: "Song not found",
      statusCode: 404,
    });
  }
});

// Get all Comments by Song ID 814
router.get('/songs/:songId/comments', async(req, res) => {
  const { songId } = req.params;
  const song = await Song.findByPk(songId);


  if(song) {
    const Comments = await Comment.findAll({
      include: [{ model: User, attributes: ["id", "username"] }],
    });

    res.json({ Comments })
  } else {
    const error = new Error("Song not found");
    error.status = 404;
    throw error;
  }
})

// Create a Comment for a song by Song ID 862 TRUE

// Add Query Filters to get All Songs 1501

module.exports = router;
