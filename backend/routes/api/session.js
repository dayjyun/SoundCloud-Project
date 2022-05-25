const express = require("express");
const router = express.Router();

const { setTokenCookie } = require("../../utils/auth");
const { validateLogin } = require('../../utils/validation')

const { User } = require("../../db/models");


// Log in
router.post('/login', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;
    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = 'Invalid Credentials';
      return next(err);
    }

    const token = await setTokenCookie(res, user);

    return res.json({ ...user.toSafeObject(), token });
  }
);

// Log out
router.delete('/logout', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Logout Successful' });
  }
);

module.exports = router;
