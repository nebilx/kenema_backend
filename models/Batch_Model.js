const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BatchSchema = new Schema(
  {
    //batch date
    batch_date: {
      type: String,
      required: [true, "batch date"],
    },

    //Medicine id
    medicine_id: {
      type: String,
      required: [true, "medicine id required"],
    },

    //Medicine quantity
    quantity: {
      type: String,
      required: [true, "medicine quantity required"],
    },

    //Medicine date expire
    date_expire: {
      type: String,
      required: [true, "medicine date expire required"],
    },

    //Medicine date manufacture
    date_mfg: {
      type: String,
      required: [true, "medicine manufacture date is required"],
    },

    branch: {
      type: String,
      required: [true, "branch is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Batch", BatchSchema);
