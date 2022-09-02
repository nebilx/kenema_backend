const express = require("express");
const router = express.Router();
const {
  getAllBranch,
  insertBranch,
  updateBranch,
  deleteBranch,
  getBranch,
} = require("../controllers/Branch_controller");

router
  .route("/")
  .get(getAllBranch)
  .post(insertBranch)
  .put(updateBranch)
  .delete(deleteBranch);

router.route("/:id").get(getBranch);

module.exports = router;
