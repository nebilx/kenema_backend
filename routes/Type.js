const express = require("express");
const router = express.Router();
const {
  getAllType,
  insertType,
  updateType,
  deleteType,
  getType,
} = require("../controllers/Type_controller");

router
  .route("/")
  .get(getAllType)
  .post(insertType)
  .put(updateType)
  .delete(deleteType);

router.route("/:id").get(getType);

module.exports = router;
