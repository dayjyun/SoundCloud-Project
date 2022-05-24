const express = require('express');
const router = express.Router();

// test
router.get('/playlistsTest', (req, res) => {
    res.json('Playlists works')
})

// GET

// Get details of a playlist using Playlist ID


// POST

// Create a playlist 1203 TRUE


// Add a song to a playlist using Playlist ID 1255 TRUE (CURRENT USER)


// PUT

// Edit a playlist 1367 TRUE (CURRENT USER)


// DELETE

// Delete a playlist 1433 TRUE (CURRENT USER)


module.exports = router;
