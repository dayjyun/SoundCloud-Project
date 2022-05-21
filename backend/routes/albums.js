const express = require("express");
const router = express.Router();

const { requireAuth, restoreUser } = require("../utils/auth");
const { Album, User, Song } = require('../db/models');
const { check } = require("express-validator");
const { handleValidationErrors } = require("../utils/validation");

// Validators
const validateAlbumEdit = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Album title is required"),
  handleValidationErrors,
];

// Create a Song for an Album with Album Id 351 TRUE (CURRENT USER)
router.post("/albums/:albumId", requireAuth, async (req, res) => {
  const { user } = req;
  const { albumId } = req.params;
  const { title, description, url, imageUrl } = req.body;

  const album = await Album.findByPk(albumId);

  if (album) {
    if ((album.userId === user.id)) {
      const newSong = await Song.create({
        title,
        description,
        url,
        imageUrl,
        userId: user.id,
        albumId,
      });
      res.status(201);
      res.json(newSong);
    } else {
        const error = new Error('Validation error: Unauthorized')
        error.status = 400;
        throw error;
    }
  } else {
      const error = new Error('Album not available');
      error.status = 404;
      throw error;
  }
});

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
router.put('/albums/:albumId', requireAuth, validateAlbumEdit, async(req, res) => {
  const { user } = req;
  const { albumId } = req.params;
  const { title, description, imageUrl } = req.body;

  const album = await Album.findByPk(albumId)

  if(album) {
    if(album.userId = user.id) {
      await album.update({
        title,
        description,
        imageUrl
      })
      res.json(album)
    } else {
    const error = new Error('Validation Error: Unauthorized')
    error.status = 401;
    throw error;
    }
  } else {
    res.json({
      message: "Album couldn't be found",
      statusCode: 404,
    });
  }
})

// Delete an album 777 TRUE (CURRENT USER)

module.exports = router;
