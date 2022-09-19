const express = require("express");
const router = express.Router();
const {
    signup,
    login,
    refresh,
    logout
} = require("../controllers/auth_Controller");

const multer = require("../utils/multer");

router.post("/signup",multer.single('image'),signup)
router.post("/login",login)
router.get("/refresh",refresh)
router.post("/logout",logout)

module.exports = router;
