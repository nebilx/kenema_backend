const router = require("express").Router();
const authToken = require("../middleware/authenticateToken");

router.get("/public", (req, res) => {
  res.json("public");
});

router.get("/private", authToken, (req, res) => {
  res.json("private");
});

module.exports = router;
