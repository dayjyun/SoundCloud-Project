const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { requireAuth, restoreUser } = require("../utils/auth");
const { handleValidationErrors } = require("../utils/validation");

const { Album, User, Song } = require("../db/models");

// Validations
const validateSong = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Song title is required"),
  check("url")
    .exists({ checkFalsy: true })
    .withMessage("Audio is required"),
  handleValidationErrors,
];

const validateAlbum = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Album title is required"),
  handleValidationErrors
];

const validateAlbumEdit = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Album title is required"),
  handleValidationErrors,
];

// GET

// Get Album Details Using Album ID
router.get("/albums/:albumId", async (req, res) => {
  const { albumId } = req.params;
  const album = await Album.findByPk(albumId, {
    include: [
      { model: User, as: "Artist", attributes: ["id", "username", "imageUrl"] },
      { model: Song },
    ],
  });

  if (!album) {
    const error = new Error("Album not found");
    error.status = 404;
    throw error;
  }
  res.json(album);
});

// Get All Albums
router.get("/albums", async (req, res) => {
  const Albums = await Album.findAll();
  res.json({ Albums });
});

// POST;

// Create A Song For An Album With Album ID
router.post("/albums/:albumId", requireAuth, validateSong, async (req, res) => {
  const { user } = req;
  const { albumId } = req.params;
  const { title, description, url, imageUrl } = req.body;

  const album = await Album.findByPk(albumId);

  if (album) {
    if (album.userId === user.id) {
      const newSong = await Song.create({
        title,
        description,
        url,
        imageUrl,
        userId: user.id,
        albumId: parseInt(albumId),
      });
      res.status(201);
      res.json(newSong);
    }
  } else {
    const error = new Error("Album not found");
    error.status = 404;
    throw error;
  }
});

// Create An Album
router.post("/albums", restoreUser, validateAlbum, async (req, res) => {
  const { user } = req;
  const { title, description, imageUrl } = req.body;

  const album = await Album.create({
    userId: user.id,
    title,
    description,
    imageUrl,
  });

  res.status(201);
  res.json(album);
});

// PUT

// Edit An Album
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
    const error = new Error('Unauthorized')
    error.status = 403;
    throw error;
    }
  } else {
    const error = new Error("Album not found");
    error.status = 404;
    throw error;
  }
})

// DELETE

// Delete An Album
router.delete("/albums/:albumId", requireAuth, async(req, res) => {
  const { user } = req;
  const { albumId } = req.params;

  const album = await Album.findByPk(albumId)

  if(album) {
    if(album.userId === user.id) {
      await album.destroy()
      res.json({
        message: "Successfully deleted",
        statusCode: 200,
      });
    } else {
      const error = new Error("Unauthorized");
      error.status = 403;
      throw error;
    }
  } else {
    const error = new Error("Album not found");
    error.status = 404;
    throw error;
  }
});

module.exports = router;
