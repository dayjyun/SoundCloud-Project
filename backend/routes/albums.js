const express = require("express");
const router = express.Router();

const { Album, Song } = require("../db/models");
const song = require("../db/models/song");
const { requireAuth } = require("../utils/auth");

// test
router.get("/albumsTest", (req, res) => {
  return res.json("Albums works!");
});

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

// Get album details using album ID 596

// Create an album 655 TRUE

// Edit an Album 709 TRUE (CURRENT USER)

// Delete an album 777 TRUE (CURRENT USER)

module.exports = router;
