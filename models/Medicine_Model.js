const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MedicineSchema = new Schema({
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

  //Medicine type
  type: {
    type: String,
    required: [true, "Medicine type is required"],
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

  //Medicine date manufacture
  date_mfg: {
    type: String,
    required: [true, "Medicine manufacture date is required"],
  },

  //Medicine dosage
  dosage: {
    type: String,
    required: [true, "Medicine dosage is required"],
  },

  //Medicine date expire
  date_expire: {
    type: String,
    required: [true, "Medicine date expire is required"],
  },

  //Medicine price
  price: {
    type: String,
    required: [true, "Medicine price is required"],
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

  //medicine package
  package: {
    type: String,
    required: [true, "Medicine packaging is required"],
  },

  //Medicine image
  image:{
    public_id:{
        type:String,
        required: [true, "publid id is required"],

    },
    url:{
        type:String,
        required: [true, "url is required"],
    }

  },

  status: {
    type: String,
    required: [true, "status is required"],
  },
});

module.exports = mongoose.model("Medicine", MedicineSchema);
