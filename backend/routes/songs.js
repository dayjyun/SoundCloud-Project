const express = require('express');
const router = express.Router();

// test
router.get('/songsTest', (req, res) => {
    res.json('Songs works!')
})

// Get all Songs


// Get details by song Id 298


// Edit a song 423 TRUE (CURRENT USER)


// Delete a Song 495 TRUE (CURRENT USER)


// Get all Comments by Song ID 814


// Create a Comment for a song by Song ID 862 TRUE


// Add Query Filters to get All Songs 1501


module.exports = router;
