const express = require('express');
const router = express.Router();

const { requireAuth, restoreUser } = require("../utils/auth");
const { Album, Song, Playlist, sequelize } = require('../db/models')

// Get All Songs By The Current User
router.get('/songs', requireAuth, async(req, res) => {
  const { user } = req;
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
      [sequelize.col("imageUrl"), "previewImage"]
    ],
    where: { userId: user.id }
  });
  res.json({ Songs });
});

// Get All Albums By Current User
router.get('/albums', requireAuth, async(req, res) => {
  const { user } = req;
  const Albums = await Album.findAll({
    where: { userId: user.id},
    attributes: [
      "id",
      "userId",
      "title",
      "description",
      "createdAt",
      "updatedAt",
      [sequelize.col("imageUrl"), "previewImage"]
    ]
  })
  res.json({ Albums });
});

// Get all playlists created by Current User
router.get("/playlists", requireAuth, async(req, res) => {
  const { user } = req;
  const Playlists = await Playlist.findAll({
    attributes: [
      "id",
      "userId",
      "name",
      "createdAt",
      "updatedAt",
      [sequelize.col("imageUrl"), "previewImage"]
    ],
    where: { userId: user.id }
  })
  res.json({ Playlists })
})

// Get Current User
router.get("/", restoreUser, async (req, res) => {
  const { user, cookies } = req;

  if (user) {
    return res.json({
      ...user.toSafeObject(),
    });
  } else {
    const error = new Error("Authentication Required");
    error.status = 401;
    throw error;
  }
});

module.exports = router;
