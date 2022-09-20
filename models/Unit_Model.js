const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnitSchema = new Schema({
  // unit name
  unit_name: {
    type: String,
    required: [true, "Unit name is required"],
  },

  //Status active or inactive
  status: {
    type: String,
    required: [true, "status is required"],
  },
});

module.exports = mongoose.models.Unit || mongoose.model("Unit", UnitSchema);
