const express = require('express');
const router = express.Router();

const { restoreUser } = require("../utils/auth");

// test
router.get('/meTest', (req, res) => {
    res.json('Me works!')
})

// Get current user 48 TRUE
router.get('/me', restoreUser, (req, res) => {
    const { user, token } = req;

    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

// Get all songs by current user 279 TRUE


// Get all albums by current user 597 TRUE


// Get all playlists created by Current User 1561 TRUE


module.exports = router;
