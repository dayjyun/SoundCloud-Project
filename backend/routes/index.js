const express = require("express");
const router = express.Router();

// router.get("/hello/world", function (req, res) {
//   res.cookie("XSRF-TOKEN", req.csrfToken());
//   res.send("Hello World!");
// });

const apiRouter = require("./api");
const albumRouter = require('./albums');
const artistRouter = require('./artists');
const commentsRouter = require('./comments');
const meRouter = require('./me');
const playlistsRouter = require('./playlists')
const songsRouter = require('./songs')

router.use(apiRouter, albumRouter, artistRouter, commentsRouter, meRouter, playlistsRouter, songsRouter);

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
});

module.exports = router;
