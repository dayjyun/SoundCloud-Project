const express = require('express');
const router = express.Router();

const { restoreUser, requireAuth } = require("../utils/auth");
const { Album, Song } = require('../db/models')

// Get all songs by current user 279 TRUE
router.get('/me/songs', requireAuth, async(req, res) => {
  const { user } = req;
  const songs = await Song.findAll({ where: { userId: user.id }});
  res.json(songs);
});

// Get all albums by current user 597 TRUE
router.get('/me/albums', requireAuth, async(req, res) => {
  const { user } = req;
  const Albums = await Album.findAll({
    where: { userId: user.id}
  })
  res.json({ Albums });
});

// Get all playlists created by Current User 1561 TRUE

// Get current user 48 TRUE
router.get('/me', restoreUser, (req, res) => {
  const { user, cookies } = req;

  if (user) {
    return res.json({
      ...user.toSafeObject(), token: cookies.token
    });
  } else {
    const error = new Error("Invalid Request");
    error.status = 400;
    throw error;
  }
});

// or this?
// router.get('/', restoreUser, (req, res) => {
//     const { user } = req;
//     if (user) {
//       return res.json({
//         user: user.toSafeObject()
//       });
//     } else return res.json({});
//   }
// );

module.exports = router;
