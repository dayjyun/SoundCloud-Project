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

// api/users.js
const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your first name"),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your last name"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username")
    .not()
    .isEmail()
    .withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password")
    .isLength({ min: 6 })
    .withMessage("Password must contain 6 characters or more."),
  handleValidationErrors,
];

// api/session.js
const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid username or email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

// albums.js
// song.js
const validateSong = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Song title is required"),
  check("url")
    .exists({ checkFalsy: true })
    .withMessage("Audio is required"),
  handleValidationErrors,
];

const validateAlbum = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Album title is required"),
  handleValidationErrors,
];

// comments.js
// song.js
const validateComment = [
  check("body")
    .exists({ checkFalsy: true })
    .withMessage("Comment body is required"),
  handleValidationErrors,
];

// playlists.js
const validatePlaylist = [
  check("name")
    .exists({ checkFalsy: true })
    .withMessage("Playlist name required"),
  handleValidationErrors,
];

// songs.js
const validatePage = [
  check("page")
    .optional({ nullable: true })
    .isInt({ min: 0 })
    .withMessage("Page must be greater than or equal to 0"),
  check("size")
    .optional({ nullable: true })
    .isInt({ min: 0 })
    .withMessage("Page must be greater than or equal to 0"),
  check("createdAt")
    .optional({ nullable: true })
    .isDate()
    .withMessage("CreatedAt is invalid"),
  handleValidationErrors,
];

module.exports = {
  handleValidationErrors,
  validateSignup,
  validateLogin,
  validateSong,
  validateAlbum,
  validateComment,
  validatePlaylist,
  validatePage,
};
