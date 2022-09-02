const express = require("express");
const router = express.Router();
const {
  getAllPatient,
  insertPatient,
  updatePatient,
  deletePatient,
  getPatient,
} = require("../controllers/Patient_controller");

router
  .route("/")
  .get(getAllPatient)
  .post(insertPatient)
  .put(updatePatient)
  .delete(deletePatient);

router.route("/:id").get(getPatient);

module.exports = router;
