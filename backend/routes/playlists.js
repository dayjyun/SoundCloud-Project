const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { requireAuth, restoreUser } = require("../utils/auth");
const { handleValidationErrors } = require("../utils/validation");
const { Playlist, Song, PlaylistSong } = require("../db/models");

// Validations
const validatePlaylist = [
    check("name")
        .exists({ checkFalsy: true })
        .withMessage("Playlist name required"),
    handleValidationErrors
]

// GET

// Get details of a playlist using Playlist ID

// POST

// Add a song to a playlist using Playlist ID 1255 TRUE (CURRENT USER)
router.post("/playlists/:playlistId", requireAuth, async (req, res) => {
  const { playlistId } = req.params;
  const { user } = req;
  const { songId } = req.body;

  const playlist = await Playlist.findByPk(playlistId);
  const song = await Song.findByPk(songId);

  if (playlist) {
    if (song) {
      if (playlist.userId === user.id) {
        const updatePlaylistSong = await PlaylistSong.create({
          playlistId,
          songId,
        });
        const playlistSong = await PlaylistSong.findOne({
          where: { playlistId, songId },
          attributes: ["id", "playlistId", "songId"],
        });
        res.json(playlistSong);
      } else {
          const error = new Error("Unauthorized");
          error.status = 404;
          throw error;
      }
    } else {
      const error = new Error("Song not found");
      error.status = 404;
      throw error;
    }
  } else {
    const error = new Error("Playlist not found");
    error.status = 404;
    throw error;
  }
});

// Create a playlist 1203 TRUE
router.post('/playlists', requireAuth, validatePlaylist, async(req, res) => {
    const { user } = req;
    const { name, imageUrl } = req.body;

    const playlist = await Playlist.create({
        userId: user.id,
        name,
        imageUrl
    })
    res.json(playlist);
})

// PUT

// Edit a playlist 1367 TRUE (CURRENT USER)

// DELETE

// Delete a playlist 1433 TRUE (CURRENT USER)

module.exports = router;
