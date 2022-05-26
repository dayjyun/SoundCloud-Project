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
