const express = require('express');
const router = express.Router();

const { Song, Album, User } = require('../db/models');
// const user = require('../db/models/user');

// Get all Songs
router.get('/songs', async (req, res) => {
    const songs = await Song.findAll();
    res.json(songs)
})

// Get details by song Id 298
router.get('/songs/:songId', async(req, res) => {
    const { songId } = req.params;
    const song = await Song.findByPk(songId, {
        include: [
            { model: User, as: "Artist", attributes: ['id', 'username', 'imageUrl'] },
            { model: Album, attributes: ['id', 'title', 'imageUrl']}
        ]
    })

    if(!song) {
        const error = new Error('Song not found')
        error.status = 404;
        throw error;
    }

    res.json({ song })
})

// Edit a song 423 TRUE (CURRENT USER)


// Delete a Song 495 TRUE (CURRENT USER)


// Get all Comments by Song ID 814


// Create a Comment for a song by Song ID 862 TRUE


// Add Query Filters to get All Songs 1501


module.exports = router;
