const router = require("express").Router();

const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");
const { restoreUser, requireAuth } = require("../../utils/auth.js");
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");

router.use(sessionRouter);

router.use(usersRouter);

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

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
