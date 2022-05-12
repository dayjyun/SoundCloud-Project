const router = require("express").Router();

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

// Example fetch request
// fetch("/api/test", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `ziYXCIMm--Jv6TB_w-M76TwHpZHJtZkPdaG8`,
//   },
//   body: JSON.stringify({ hello: "world" }),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data));

module.exports = router;
