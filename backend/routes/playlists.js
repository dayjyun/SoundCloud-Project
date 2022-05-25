const express = require('express');
const router = express.Router();
const { check } = require("express-validator");

const { requireAuth, restoreUser } = require("../utils/auth");
const { handleValidationErrors } = require("../utils/validation");
const { Playlist } = require("../db/models");

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

// Add a song to a playlist using Playlist ID 1255 TRUE (CURRENT USER)


// PUT

// Edit a playlist 1367 TRUE (CURRENT USER)


// DELETE

// Delete a playlist 1433 TRUE (CURRENT USER)


module.exports = router;
