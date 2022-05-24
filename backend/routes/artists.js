const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { requireAuth, restoreUser } = require("../utils/auth");
const { handleValidationErrors } = require("../utils/validation");
const { User, Song, Album } = require("../db/models");

// test
router.get("/artistsTest", (req, res) => {
  return res.json("Artists works!");
});

// Get details of an artist/user by Artist ID 1028
router.get("/artists/:artistId", async (req, res) => {
  const { artistId } = req.params;
  const artist = await User.findByPk(artistId, {
    attributes: ["id", "username", "imageUrl"],
  });

  const totalSongs = await Song.count({ where: { userId: artistId } });
  const totalAlbums = await Album.count({ where: { userId: artistId } });

  if (artist) {
    res.json({
      ...artist.toSafeObject(),
      totalSongs,
      totalAlbums,
      imageUrl: artist.imageUrl,
    });
  } else {
    const error = new Error("Artist not found");
    error.status = 404;
    throw error;
  }
});

// Get details of an artist/user by Artist ID 1028

// Get all songs of an artist by Id 1090

// Get all Songs of an artist by Id 1132

// Get all albums of an artist by Id 1182

// Get all Playlists of an artist by Id 1230

module.exports = router;
