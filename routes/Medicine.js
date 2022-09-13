const express = require("express");
const router = express.Router();
const {
  getAllMedicine,
  insertMedicine,
  updateMedicine,
  deleteMedicine,
  getMedicine,
} = require("../controllers/Medicine_controller");

const multer = require("../utils/multer");
router
  .route("/")
  .get(getAllMedicine)
  .post(multer.single("image"), insertMedicine)
  .put(multer.single("image"), updateMedicine)
  .delete(deleteMedicine);

router.route("/:id").get(getMedicine);

module.exports = router;
