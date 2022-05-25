const express = require('express');
const router = express.Router();

const { requireAuth } = require("../utils/auth");

const { Album, Song } = require('../db/models')

// Get All Songs By The Current User
router.get('/me/songs', requireAuth, async(req, res) => {
  const { user } = req;
  const songs = await Song.findAll({ where: { userId: user.id }});
  res.json(songs);
});

// Get All Albums By Current User
router.get('/me/albums', requireAuth, async(req, res) => {
  const { user } = req;
  const Albums = await Album.findAll({
    where: { userId: user.id}
  })
  res.json({ Albums });
});

// Get All Playlists Created By Current User

// Get Current User
router.get("/me", requireAuth, async (req, res) => {
  const { user, cookies } = req;

  if (user) {
    return res.json({
      ...user.toSafeObject(),
      token: cookies.token,
    });
  } else return res.json({});
});

module.exports = router;
