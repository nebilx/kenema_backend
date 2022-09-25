const express = require("express");
const router = express.Router();
const {
  getAllPharmacyUser,
  insertPharmacyUser,
  updatePharmacyUser,
  deletePharmacyUser,
  getPharmacyUser,
} = require("../controllers/Pharmacy_User_Account_Controller");

const multer = require("../utils/multer");

router
  .route("/")
  .get(getAllPharmacyUser)
  .post(multer.single("image"), insertPharmacyUser)
  .put(multer.single("image"), updatePharmacyUser)
  .delete(deletePharmacyUser);

router.route("/:id").get(getPharmacyUser);

module.exports = router;