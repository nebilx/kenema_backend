const express = require("express");
const router = express.Router();
const {
  getAllUnit,
  insertUnit,
  updateUnit,
  deleteUnit,
  getUnit,
} = require("../controllers/Unit_controller");

router
  .route("/")
  .get(getAllUnit)
  .post(insertUnit)
  .put(updateUnit)
  .delete(deleteUnit);

router.route("/:id").get(getUnit);

module.exports = router;
