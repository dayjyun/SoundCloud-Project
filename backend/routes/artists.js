const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { requireAuth, restoreUser } = require("../utils/auth");
const { handleValidationErrors } = require("../utils/validation");

const { Album, User, Song, Playlist } = require("../db/models");

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

// Get all Songs of an artist by Id 1132
router.get('/artists/:artistId/songs', async(req, res) => {
  const { artistId } = req.params;
  const artist = await User.findByPk(artistId);

  if(artist) {
    const Songs = await Song.findAll({ where: { userId: artistId } })
    res.json({ Songs });
  } else {
    const error = new Error("Artist not found");
    error.status = 404;
    throw error;
  }
})

// Get all albums of an artist by Id 1182
router.get("/artists/:artistId/albums", async (req, res) => {
  const { artistId } = req.params;
  const artist = await User.findByPk(artistId);

  if (artist) {
    const Albums = await Album.findAll({ where: { userId: artistId } });
    res.json({ Albums });
  } else {
    const error = new Error("Artist not found");
    error.status = 404;
    throw error;
  }
});

// Get all Playlists of an artist by Id 1230
router.get("/artists/:artistId/playlists", async (req, res) => {
  const { artistId } = req.params;
  const artist = await User.findByPk(artistId);

  if (artist) {
    const Playlists = await Playlist.findAll({ where: { userId: artistId } });
    res.json({ Playlists });
  } else {
    const error = new Error("Artist not found");
    error.status = 404;
    throw error;
  }
});

module.exports = router;
