const express = require("express");
const router = express.Router();

const { setTokenCookie } = require("../../utils/auth");
const { validateSignup } = require("../../utils/validation")

const { User } = require("../../db/models");

// Sign up !!!
router.post('/signup', validateSignup, async (req, res) => {
    const { firstName, lastName, email, password, username } = req.body;
    const checkEmail = await User.findOne({ where: { email } })
    const checkUsername = await User.findOne({ where: { username } })

    if(checkEmail) {
      let error = new Error('User already exists');
      error.status = 403
      error.errors = [ "User with that email already exists" ]
      throw error;
    }
    if (checkUsername) {
      let error = new Error("User already exists");
      error.status = 403;
      error.errors = ["User with the username already exists"]
      throw error;
    }

    const user = await User.signup({ firstName, lastName, email, username, password });

    const token = await setTokenCookie(res, user);

    return res.json({ ...user.toSafeObject(), token });
  }
);

module.exports = router;
