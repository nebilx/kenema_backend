const express = require("express");
const router = express.Router();
const {
  getAllPharmacyUser,
  insertPharmacyUser,
  updatePharmacyUser,
  deletePharmacyUser,
  getPharmacyUser,
} = require("../controllers/Pharmacy_User_Account_Controller");

router.post("/login", login);
router.get("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;
