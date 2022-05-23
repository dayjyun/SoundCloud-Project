const express = require("express");
const router = express.Router();

const { requireAuth, restoreUser } = require("../utils/auth");
const { Album, User, Song } = require("../db/models");

// GET

// Get album details using album ID 596
router.get("/albums/:albumId", async (req, res) => {
  const { albumId } = req.params;
  const album = await Album.findByPk(albumId, {
    include: [
      { model: User, as: "Artist", attributes: ["id", "username", "imageUrl"] },
      { model: Song },
    ],
  });

  if (!album) {
    res.json({
      message: "Album couldn't be found",
      statusCode: 404,
    });
  }

  res.json(album);
});

// Get All Albums 532
router.get("/albums", async (req, res) => {
  const Albums = await Album.findAll();
  res.json({ Albums });
});

// POST

// Create a Song for an Album with Album Id 351 TRUE (CURRENT USER)
router.post("/albums/:albumId", requireAuth, async (req, res) => {
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
        albumId,
      });
      res.status(201);
      res.json(newSong);
    }
  } else {
    res.json({
      message: "Album couldn't be found",
      statusCode: 404,
    });
  }
});

// Create an album 655 TRUE
router.post("/albums", restoreUser, async (req, res) => {
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

// Edit an Album 709 TRUE (CURRENT USER)

// Delete an album 777 TRUE (CURRENT USER)

module.exports = router;
