const express = require('express');
const router = express.Router();

const { restoreUser } = require("../utils/auth");

// Get current user 48 TRUE
router.get('/me', restoreUser, (req, res) => {
    const { user, cookies } = req;

    if (user) {
      return res.json({
        ...user.toSafeObject(), token: cookies.token
      });
    } else return res.json({
      msg: "Invalid request"
    });
  }
);

// Get all songs by current user 279 TRUE


// Get all albums by current user 597 TRUE


// Get all playlists created by Current User 1561 TRUE


module.exports = router;
