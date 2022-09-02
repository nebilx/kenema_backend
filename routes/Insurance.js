const express = require("express");
const router = express.Router();
const {
  getAllInsurance,
  insertInsurance,
  updateInsurance,
  deleteInsurance,
  getInsurance,
} = require("../controllers/Insurance_controller");

router
  .route("/")
  .get(getAllInsurance)
  .post(insertInsurance)
  .put(updateInsurance)
  .delete(deleteInsurance);

router.route("/:id").get(getInsurance);

module.exports = router;
