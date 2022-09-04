const express = require("express");
const router = express.Router();
const {
  getAllDosage,
  insertDosage,
  updateDosage,
  deleteDosage,
  getDosage,
} = require("../controllers/Dosage_controller");

router
  .route("/")
  .get(getAllDosage)
  .post(insertDosage)
  .put(updateDosage)
  .delete(deleteDosage);

router.route("/:id").get(getDosage);

module.exports = router;
