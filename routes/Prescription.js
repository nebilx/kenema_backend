const express = require("express");
const router = express.Router();
const {
  getAllPrescription,
  insertPrescription,
  updatePrescription,
  deletePrescription,
  getPrescription,
} = require("../controllers/Prescription_Controller");

router
  .route("/")
  .get(getAllPrescription)
  .post(insertPrescription)
  .put(updatePrescription)
  .delete(deletePrescription);

router.route("/:id").get(getPrescription);

module.exports = router;
