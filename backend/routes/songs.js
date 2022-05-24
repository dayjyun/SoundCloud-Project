const express = require("express");
const router = express.Router();

const { Song, Album, User, Comment } = require("../db/models");

const { requireAuth } = require("../utils/auth.js");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../utils/validation");

// Validators
const validateSong = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Song title is required"),
  check("url").exists({ checkFalsy: true }).withMessage("Audio is required"),
  handleValidationErrors,
];

const validateCommentBody = [
  check("body")
    .exists({ checkFalsy: true })
    .withMessage("Comment required"),
  handleValidationErrors
]

// GET

// Get all Comments by Song ID 814
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

// POST

// Create a Comment for a song by Song ID 862 TRUE
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

// DELETE

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

// Add Query Filters to get All Songs 1501

module.exports = router;
