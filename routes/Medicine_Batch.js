const express = require("express");
const router = express.Router();
const {
  getAllMedicine_Batch,
  insertMedicine_Batch,
  updateMedicine_Batch,
  deleteMedicine_Batch,
  getMedicine_Batch,
} = require("../controllers/Medicine_Batch_Controller");

router
  .route("/")
  .get(getAllMedicine_Batch)
  .post(insertMedicine_Batch)
  .put(updateMedicine_Batch)
  .delete(deleteMedicine_Batch);

router.route("/:id").get(getMedicine_Batch);

module.exports = router;
