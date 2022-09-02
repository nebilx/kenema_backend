const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientUserSchema = new Schema({
    user_name : {
     type: String,
    },
    user_pwd: {
     type:String,
    }
 });

const PatientSchema = new Schema({
  //patient name
  name: {
    type: String,
    required: [true, "patient name is required"],
  },
  //patient age
  age: {
    type: Number,
    required: [true, "patient age is required"],
  },
  //patient gender
  gender: {
    type: String,
    required: [true, "patient gender is required"],
  },
   //patient dob
   dob: {
    type: String,
    required: [true, "patient dob is required"],
  },
  //patient address
  address: {
    type: String,
    required: [true, "patient address is required"],
  },
   //patient phone number
   pno: {
    type: Number,
    required: [true, "patient phone number is required"],
  },
  //patient image
  image: {
    type: String,
    required: [true, "patient image is required"],
  },

  Patient: [PatientUserSchema],

});



module.exports = mongoose.model("patient", PatientSchema);
