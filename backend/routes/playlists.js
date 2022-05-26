const express = require("express");
const router = express.Router();

const { requireAuth } = require("../utils/auth");
const { validatePlaylist } = require('../utils/validation')

const { Playlist, Song, PlaylistSong, sequelize } = require("../db/models");

// GET

// Get Details Of A Playlist Using Playlist ID
router.get("/:playlistId", async (req, res) => {
  const { playlistId } = req.params;
  const playlist = await Playlist.findByPk(playlistId, {
    attributes: [
      "id",
      "userId",
      "name",
      "createdAt",
      "updatedAt",
      // [sequelize.col("imageUrl"), "previewImage"]
    ],
    include: [
      {
        model: Song,
        attributes: [
          "id",
          "userId",
          "albumId",
          "title",
          "description",
          "url",
          "createdAt",
          "updatedAt",
          [sequelize.col("imageUrl"), "previewImage"],
        ],
        through: { attributes: [] },
      },
    ],
  });

  if (!playlist) {
    const error = new Error("Playlist not found");
    error.status = 404;
    throw error;
  }

  res.json(playlist);
});

// POST

// Add A Song To A Playlist Using Playlist ID
router.post("/:playlistId", requireAuth, async (req, res) => {
  const { playlistId } = req.params;
  const { user } = req;
  const { songId } = req.body;

  const playlist = await Playlist.findByPk(playlistId);
  const song = await Song.findByPk(songId);

  if (playlist) {
    if (song) {
      if (playlist.userId === user.id) {
        const updatePlaylistSong = await PlaylistSong.create({
          playlistId,
          songId,
        });
        const playlistSong = await PlaylistSong.findOne({
          where: { playlistId, songId },
          attributes: ["id", "playlistId", "songId"],
        });
        res.json(playlistSong);
      } else {
        const error = new Error("Unauthorized");
        error.status = 403;
        throw error;
      }
    } else {
      const error = new Error("Song not found");
      error.status = 404;
      throw error;
    }
  } else {
    const error = new Error("Playlist not found");
    error.status = 404;
    throw error;
  }
});

// Create A Playlist
router.post("/", requireAuth, validatePlaylist, async (req, res) => {
  const { user } = req;
  const { name, imageUrl } = req.body;

  const playlist = await Playlist.create({
    userId: user.id,
    name,
    imageUrl,
  });
  playlist.dataValues.previewImage = imageUrl;
  delete playlist.dataValues.imageUrl;

  res.json(playlist);
});

// PUT

// Edit A Playlist
router.put("/:playlistId", requireAuth, validatePlaylist, async (req, res) => {
    const { playlistId } = req.params;
    const { user } = req;
    const { name, imageUrl } = req.body;

    const neoPlaylist = await Playlist.findByPk(playlistId);

    if (neoPlaylist) {
      if (neoPlaylist.userId === user.id) {
        neoPlaylist.update({
          name,
          imageUrl,
        });
        neoPlaylist.dataValues.previewImage = imageUrl;
        delete neoPlaylist.dataValues.imageUrl;

        res.json(neoPlaylist);
      } else {
        const error = new Error("Unauthorized");
        error.status = 403;
        throw error;
      }
    } else {
      const error = new Error("Playlist not found");
      error.status = 404;
      throw error;
    }
  }
);

// DELETE

// Delete A Playlist
router.delete("/:playlistId", requireAuth, async (req, res) => {
  const { playlistId } = req.params;
  const { user } = req;
  const playlist = await Playlist.findByPk(playlistId);

  if (playlist) {
    if (playlist.userId === user.id) {
      await playlist.destroy();
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
    const error = new Error("Playlist not found");
    error.status = 404;
    throw error;
  }
});

module.exports = router;
