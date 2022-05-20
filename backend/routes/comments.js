const express = require('express');
const router = express.Router();

// test
router.get('/commentsTest', (req, res) => {
    res.json('Comments works!')
})

// Edit a comment 926 TRUE (CURRENT USER)


// Delete a comment 991 TRUE (CURRENT USER)


module.exports = router;
