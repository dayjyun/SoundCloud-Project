const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { requireAuth, restoreUser } = require("../utils/auth");
const { handleValidationErrors } = require("../utils/validation");
const { Playlist, Song } = require("../db/models");

// GET

// Get details of a playlist using Playlist ID

// POST

// Create a playlist 1203 TRUE

// Add a song to a playlist using Playlist ID 1255 TRUE (CURRENT USER)
router.post("/playlists/:playlistId", requireAuth, async(req, res) => {
    const { playlistId } = req.params;
    const { user } = req;
    const { songId } = req.params;

    const playlist = await Playlist.findByPk(playlistId);
    const song = await Song.findByPk(songId);

    if(playlist) {
        if(song) {

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
