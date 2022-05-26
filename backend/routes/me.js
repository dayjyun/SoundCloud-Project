const express = require('express');
const router = express.Router();

const { requireAuth } = require("../utils/auth");

const { Album, Song, sequelize } = require('../db/models')

// Get All Songs By The Current User
router.get('/songs', requireAuth, async(req, res) => {
  const { user } = req;
  const Songs = await Song.findAll({ where: { userId: user.id }});
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

// Get All Playlists Created By Current User

// Get Current User ***
router.get("/", requireAuth, async (req, res) => {
  const { user, cookies } = req;

  if (user) {
    return res.json({
      ...user.toSafeObject(),
      // token: cookies.token,
    });
  } else return res.json({});
});

// or this
// router.get("/me", requireAuth, async (req, res) => {
//   const { user, cookies } = req;

//   if (user) {
//     return res.json({
//       ...user.toSafeObject(),
//     });
//   } else {
//     const error = new Error("Authentication Required");
//     error.status = 401;
//     throw error;
//   }
// });

module.exports = router;
