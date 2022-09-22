const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema(
  {
    prescription_id: {
      type: Number,
      required: [true, "prescription ID is required"],
    },
    prescription_date: {
      type: String,
      required: [true, "prescription date is required"],
    },
    insurance_user_id: {
      type: String,
      required: [true, "insurance user id is required"],
    },
    hospital_name: {
      type: String,
      required: [true, "hospital name is required"],
    },
    medicine_name: {
      type: String,
      required: [true, "medicine Name is required"],
    },
    dosage: {
      type: String,
      required: [true, "medicine dosage  is required"],
    },
    refill_date: {
      type: String,
      required: [true, "medicine refill is required"],
    },
    duration: {
      type: String,
      required: [true, "medicine duration is required"],
    },
    take_time: {
      type: String,
      required: [true, "medicine time take is required"],
    },
    branch: {
      type: String,
      required: [true, "branch is required"],
    },
    status: {
      type: String,
      required: [true, "status is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prescription", PrescriptionSchema);
