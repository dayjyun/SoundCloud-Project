const express = require("express");
const router = express.Router();

// test
router.get('/albumsTest', (req, res) => {
    return res.json('Albums works!')
})

// Create a Song for an Album with Album Id 351 TRUE (CURRENT USER)


// Get All Albums 532


// Get album details using album ID 596


// Create an album 655 TRUE


// Edit an Album 709 TRUE (CURRENT USER)


// Delete an album 777 TRUE (CURRENT USER)



module.exports = router;
