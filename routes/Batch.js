const express = require("express");
const router = express.Router();
const {
  getAllBatch,
  insertBatch,
  updateBatch,
  deleteBatch,
  getBatch,
} = require("../controllers/Batch_Controller");

router
  .route("/")
  .get(getAllBatch)
  .post(insertBatch)
  .put(updateBatch)
  .delete(deleteBatch);

router.route("/:id").get(getBatch);

module.exports = router;
