const express = require("express");
const router = express.Router();
const {
  getAllPharmacist,
  insertPharmacist,
  updatePharmacist,
  deletePharmacist,
  getPharmacist,
} = require("../controllers/Pharmacist_controller");

const multer = require("../utils/multer");



router
  .route("/")
  .get(getAllPharmacist)
  .post(multer.single('image'),insertPharmacist)
  .put(multer.single('image'),updatePharmacist)
  .delete(deletePharmacist);
  
router.route("/:id").get(getPharmacist);


module.exports = router;
