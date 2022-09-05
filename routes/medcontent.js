const express = require("express");
const router = express.Router();
const getMed_content = require("../controllers/Med_content_controller");

router.get("/", getMed_content);

module.exports = router;
