const express = require("express");
const router = express.Router();
const { login, logout, refresh } = require("../controllers/Auth_Controller");

router.post("/login", login);
router.get("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;
