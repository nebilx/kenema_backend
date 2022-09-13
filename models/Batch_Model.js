const mongoose = require("mongoose");
const { array } = require("../utils/multer");
const Schema = mongoose.Schema;

const BatchSchema = new Schema({
  // medicine id
  // medicine_id: {
  //   type: String,
  //   required: [true, " medicine id is required"],
  // },

  // //Drug expire
  // drug_expire: {
  //   type: String,
  //   required: [true, "Drug expire is required"],
  // },

  // //Drug quantity
  // drug_quantity: {
  //   type: String,
  //   required: [true, "Drug quantity is required"],
  // },

  // //status
  // status: {
  //   type: String,
  //   required: [true, "Status is required"],
  // },

  batch_date: {
    type: String,
    required: [true, "batch date"],
  },

  batch_medicine: [
    {
      type: Array,
      required: [true, "medicine batch required"],

      // medicine_name: {
      //   type: String,
      //   required: [true, "medicine name required"]
      // },
      // medicine_quantity: {
      //   type: String,
      //   required: [true, "medicine expire required"]
      // },
      // medicine_expiredate: {
      //   type: String,
      //   required: [true, "medicine date required"]
      // }

      //Medicine date manufacture
      date_mfg: {
        type: String,
        required: [true, "Medicine manufacture date is required"],
      },

      //Medicine date expire
      date_expire: {
        type: String,
        required: [true, "Medicine date expire is required"],
      },
    },
  ],
});

module.exports = mongoose.model("Batch", BatchSchema);
