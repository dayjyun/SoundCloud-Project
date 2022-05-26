const express = require("express");
const router = express.Router();

const { Album, User, Song, Playlist } = require("../db/models");

// Get All Songs Of An Artist By ID
router.get('/:artistId/songs', async(req, res) => {
  const { artistId } = req.params;
  const artist = await User.findByPk(artistId);

  if(artist) {
    const Songs = await Song.findAll({ where: { userId: artistId } })
    res.json({ Songs });
  } else {
    const error = new Error("Artist not found");
    error.status = 404;
    throw error;
  }
})

// Get All Albums Of An Artist By ID
router.get("/:artistId/albums", async(req, res) => {
  const { artistId } = req.params;
  const artist = await User.findByPk(artistId);

  if (artist) {
    const Albums = await Album.findAll({ where: { userId: artistId } });
    res.json({ Albums });
  } else {
    const error = new Error("Artist not found");
    error.status = 404;
    throw error;
  }
});

// Get All Playlists Of An Artist By ID
router.get("/:artistId/playlists", async(req, res) => {
  const { artistId } = req.params;
  const artist = await User.findByPk(artistId);

  if (artist) {
    const Playlists = await Playlist.findAll({ where: { userId: artistId } });
    res.json({ Playlists });
  } else {
    const error = new Error("Artist not found");
    error.status = 404;
    throw error;
  }
});

// Get Details Of An Artist (User) By Artist ID
router.get("/:artistId", async(req, res) => {
  const { artistId } = req.params;
  const artist = await User.findByPk(artistId, {
    attributes: ["id", "username", "imageUrl"],
  });

  const totalSongs = await Song.count({ where: { userId: artistId } });
  const totalAlbums = await Album.count({ where: { userId: artistId } });

  if (artist) {
    res.json({
      ...artist.toSafeObject(),
      totalSongs,
      totalAlbums,
      imageUrl: artist.imageUrl,
    });
  } else {
    const error = new Error("Artist not found");
    error.status = 404;
    throw error;
  }
});


module.exports = router;
