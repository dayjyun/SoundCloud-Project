const { validationResult } = require("express-validator");
const { check } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);

    const err = Error('Validation Error');
    err.errors = errors;
    err.status = 400;
    next(err);
  }
  next();
};

// albums.js
const validateSong = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Song title is required"),
  check("url").exists({ checkFalsy: true }).withMessage("Audio is required"),
  handleValidationErrors,
];

const validateAlbum = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Album title is required"),
  handleValidationErrors,
];

const validateAlbumEdit = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Album title is required"),
  handleValidationErrors,
];

module.exports = { handleValidationErrors,
  validateSong,
  validateAlbum,
  validateAlbumEdit
};
