const express = require('express');
const router = express.Router();

const { restoreUser } = require("../utils/auth");

// test
router.get('/meTest', (req, res) => {
    res.json('me works!')
})

// Get current user 48
router.get('/', restoreUser, (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

// Get all songs by current user 279


// Get all albums by current user 597


// Get all playlists created by Current User 1561


module.exports = router;
