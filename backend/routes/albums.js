const express = require("express");
const router = express.Router();

const { requireAuth, restoreUser } = require("../utils/auth");
const { Album, User, Song } = require('../db/models')

// Create a Song for an Album with Album Id 351 TRUE (CURRENT USER)


// Get All Albums 532
router.get('/albums', async (req, res) => {
    const Albums = await Album.findAll()
    res.json({ Albums })
})


// Get album details using album ID 596
router.get('/albums/:albumId', async(req, res) => {
    const { albumId } = req.params;
    const album = await Album.findByPk(albumId, {
        include: [
            { model: User, as: "Artist", attributes: [ 'id', 'username', 'imageUrl' ] },
            { model: Song }
        ]
    })

    if (!album) {
        res.json({
          message: "Album couldn't be found",
          statusCode: 404,
        });
    }

    res.json(album)
})

// Create an album 655 TRUE


// Edit an Album 709 TRUE (CURRENT USER)


// Delete an album 777 TRUE (CURRENT USER)



module.exports = router;
