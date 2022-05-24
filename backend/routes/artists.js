const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { requireAuth, restoreUser } = require("../utils/auth");
const { handleValidationErrors } = require("../utils/validation");
const { User, Song, Album } = require("../db/models");

// Get details of an artist/user by Artist ID 1028

// Get all Songs of an artist by Id 1132
router.get('artists/:artistId/songs', async(req, res) => {
  const { artistId } = req.params;
  const Songs = await
})

// Get all albums of an artist by Id 1182

// Get all Playlists of an artist by Id 1230

module.exports = router;
