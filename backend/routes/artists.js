const express = require("express");
const router = express.Router();

// test
router.get("/artistsTest", (req, res) => {
  return res.json("Artists works!");
});

// Get details of an artist/user by Artist ID 1028


// Get all songs of an artist by Id 1090


// Get all Songs of an artist by Id 1132


// Get all albums of an artist by Id 1182


// Get all Playlists of an artist by Id 1230


module.exports = router;
