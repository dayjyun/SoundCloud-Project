const express = require("express");
const router = express.Router();

const apiRouter = require("./api");
const albumRouter = require('./albums');
const artistRouter = require('./artists');
const commentsRouter = require('./comments');
const meRouter = require('./me');
const playlistsRouter = require('./playlists')
const songsRouter = require('./songs')

router.use(apiRouter);
router.use("/albums", albumRouter);
router.use("/artists", artistRouter);
router.use("/comments", commentsRouter);
router.use("/me", meRouter);
router.use("/playlists", playlistsRouter);
router.use("/songs", songsRouter);

router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    "XSRF-Token": csrfToken,
  });
});

module.exports = router;
