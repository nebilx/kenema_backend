const express = require("express");
const router = express.Router();
const {
  getAllInsurance_User,
  insertInsurance_User,
  updateInsurance_User,
  deleteInsurance_User,
  getInsurance_User,
} = require("../controllers/Insurance_User_Controller");

const multer = require("../utils/multer");

router
  .route("/")
  .get(getAllInsurance_User)
  .post(
    multer.fields([
      {
        name: "p_image",
        maxCount: 1,
      },
      {
        name: "insurance_image",
        maxCount: 1,
      },
    ]),
    insertInsurance_User
  )
  .put(
    multer.fields([
      {
        name: "p_image",
        maxCount: 1,
      },
      {
        name: "insurance_image",
        maxCount: 1,
      },
    ]),
    updateInsurance_User
  )
  .delete(deleteInsurance_User);

router.route("/:id").get(getInsurance_User);

module.exports = router;
