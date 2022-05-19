const express = require('express');
const router = express.Router();

// test
router.get('/playlistsTest', (req, res) => {
    res.json('Playlists works')
})

// Create a playlist 1203 TRUE


// Add a song to a playlist using Playlist ID 1255 TRUE (CURRENT USER)


// Get details of a playlist using Playlist ID


// Edit a playlist 1367 TRUE (CURRENT USER)


// Delete a playlist 1433 TRUE (CURRENT USER)


module.exports = router;
