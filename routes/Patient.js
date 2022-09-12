const express = require("express");
const router = express.Router();
const {
  getAllPatient,
  insertPatient,
  updatePatient,
  deletePatient,
  getPatient,
} = require("../controllers/Patient_controller");

const multer = require("../utils/multer");

router
  .route("/")
  .get(getAllPatient)
  .post(multer.fields([{
    name: 'p_image', maxCount: 1
  }, {
    name: 'insurance_image', maxCount: 1
  }]),insertPatient)
  .put(multer.fields([{
    name: 'p_image', maxCount: 1
  }, {
    name: 'insurance_image', maxCount: 1
  }]),updatePatient)
  .delete(deletePatient);

router.route("/:id").get(getPatient);

module.exports = router;
