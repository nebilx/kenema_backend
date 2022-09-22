const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BranchSchema = new Schema(
  {
    //branch name
    name: {
      type: String,
      required: [true, "branch name is required"],
    },
    //branch phone number
    pno: {
      type: Number,
      required: [true, "branch phone number is required"],
    },
    //branch address
    address: {
      type: String,
      required: [true, "branch address is required"],
    },

    location: {
      longitude: {
        type: String,
        required: [true, "location longitude is required"],
      },

      latitude: {
        type: String,
        required: [true, " location latitude is required"],
      },
    },

    // status
    status: {
      type: String,
      required: [true, "branch status is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Branch", BranchSchema);
