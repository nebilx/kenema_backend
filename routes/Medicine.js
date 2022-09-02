const express = require("express");
const router = express.Router();
const {
  getAllMedicine,
  insertMedicine,
  updateMedicine,
  deleteMedicine,
  getMedicine,
} = require("../controllers/Medicine_controller");

router
  .route("/")
  .get(getAllMedicine)
  .post(insertMedicine)
  .put(updateMedicine)
  .delete(deleteMedicine);

router.route("/:id").get(getMedicine);

module.exports = router;
