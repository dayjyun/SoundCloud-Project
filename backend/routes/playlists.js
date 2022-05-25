const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { requireAuth, restoreUser } = require("../utils/auth");
const { handleValidationErrors } = require("../utils/validation");
const { Playlist, Song, PlaylistSong } = require("../db/models");

// GET

// Get details of a playlist using Playlist ID

// POST

// Create a playlist 1203 TRUE

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

// PUT

// Edit a playlist 1367 TRUE (CURRENT USER)

// DELETE

// Delete a playlist 1433 TRUE (CURRENT USER)

module.exports = router;
