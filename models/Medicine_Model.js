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

  //Medicine manufature
  mfg: {
    type: String,
    required: [true, "Medicine manufature is required"],
  },

  //Medicine generic name
  generic_name: {
    type: String,
    required: [true, "Medicine genric_name is required"],
  },

  //Medicine date manufature
  date_mfg: {
    type: String,
    required: [true, "Medicine date is required"],
  },

  //Medicine catagory
  category: {
    type: String,
    required: [true, "Medicine catagory is required"],
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
    required: [true, "Medicine strenght is required"],
  },

  //Medicine form
  form: {
    type: String,
    required: [true, "Medicine form is required"],
  },

  //Medicine image
  image: {
    type: String,
    required: [true, "Medicine image is required"],
  },
});

module.exports = mongoose.model("Medicine", MedicineSchema);
