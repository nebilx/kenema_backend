const express = require("express");
const router = express.Router();
const {
  getAllPackage,
  insertPackage,
  updatePackage,
  deletePackage,
  getPackage,
} = require("../controllers/Package_controller");

router
  .route("/")
  .get(getAllPackage)
  .post(insertPackage)
  .put(updatePackage)
  .delete(deletePackage);

router.route("/:id").get(getPackage);

module.exports = router;
