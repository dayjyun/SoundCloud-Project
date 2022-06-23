const express = require("express")
const router = express.Router();

const { User } = require("../../db/models");
const { restoreUser, requireAuth, setTokenCookie } = require("../../utils/auth.js");
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");

router.use(sessionRouter);
router.use(usersRouter);

router.post('/test', async(req, res) => {
  res.json({
    Hello: "World"
  })
})

router.get("/set-token-cookie", async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: "Demo-lition",
    },
  });
  setTokenCookie(res, user);
  return res.json({ user });
});

// GET /api/restore-user
router.get('/restore-user', restoreUser, (req, res) => {
    return res.json(req.user);
  }
);

// GET /api/require-auth
router.get('/require-auth', requireAuth, (req, res) => {
    return res.json(req.user);
  }
);

module.exports = router;
