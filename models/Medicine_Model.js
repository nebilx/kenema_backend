const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedicineSchema = new Schema(
  {
    //Medicine id
    medicine_id: {
      type: String,
      required: [true, "Medicine id is required"],
    },

    //Medicine name
    name: {
      type: String,
      required: [true, "Medicine name is required"],
    },

    //Medicine manufacture
    mfg: {
      type: String,
      required: [true, "Medicine manufacture is required"],
    },

    //Medicine generic name
    generic_name: {
      type: String,
      required: [true, "Medicine generic_name is required"],
    },

    //Medicine strength
    strength: {
      type: String,
      required: [true, "Medicine strength is required"],
    },

    //Medicine unit
    unit: {
      type: String,
      required: [true, "Medicine unit is required"],
    },

    //Medicine image
    image: {
      public_id: {
        type: String,
        required: [true, "publid id is required"],
      },
      url: {
        type: String,
        required: [true, "url is required"],
      },
    },

    status: {
      type: String,
      required: [true, "status is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Medicine", MedicineSchema);
