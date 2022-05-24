const express = require("express");
const router = express.Router();

const { requireAuth, restoreUser } = require("../utils/auth");
const { handleValidationErrors } = require("../utils/validation");
const { Album, User, Song, Playlist } = require("../db/models");

// Get details of an artist/user by Artist ID 1028


// Get all songs of an artist by Id 1090


// Get all Songs of an artist by Id 1132


// Get all albums of an artist by Id 1182


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
