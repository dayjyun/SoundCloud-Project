const express = require("express");

const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

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

// Sign up
router.post('/signup', validateSignup, async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const checkEmail = await User.findOne({ where: { email } })
    const checkUsername = await User.findOne({ where: { username } })

    if(checkEmail) {
      let error = new Error('E-mail already exists');
      error.status = 403
      throw error;
    }
    if (checkUsername) {
      let error = new Error("Username already exists");
      error.status = 403;
      throw error;
    }

    const user = await User.signup({ firstName, lastName, email, username, password });

    const token = await setTokenCookie(res, user);

    return res.json({ ...user.toSafeObject(), token });
  }
);

module.exports = router;
