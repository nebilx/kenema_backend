const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientUserSchema = new Schema({
  _id: false,
  user_name: {
    type: String,
    required: [true, "user name is required"],
  },
  user_pwd: {
    type: String,
    required: [true, "user password is required"],
  },
  status: {
    type: String,
    required: [true, "status is required"],
  },
});

const PatientInsuranceSchema = new Schema({
  _id: false,
  //Insurance id
  insurance_id: {
    type: String,
    required: [true, "Insurance id is required"],
  },

  //Insurance name
  insurance_name: {
    type: String,
    required: [true, "Insurance name is required"],
  },

  //Insurance age
  insurance_image: {
    public_id: {
      type: String,
      required: [true, "public id is required"],
    },
    url: {
      type: String,
      required: [true, "url is required"],
    },
  },
});

const PatientAddressSchema = new Schema({
  _id: false,
  city: {
    type: String,
    required: [true, "city is required"],
  },
  sub_city: {
    type: String,
    required: [true, "sub_city is required"],
  },
  woreda: {
    type: String,
    required: [true, "woreda is required"],
  },
  house_no: {
    type: String,
    required: [true, "house no is required"],
  },
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

  //patient phone number
  pno: {
    type: Number,
    required: [true, "patient phone number is required"],
  },
  //patient image
  p_image: {
    public_id: {
      type: String,
      required: [true, "public id is required"],
    },
    url: {
      type: String,
      required: [true, "url is required"],
    },
  },

  // patient address
  address: [PatientAddressSchema],
  // patient insurance
  insurance: [PatientInsuranceSchema],
  //patient user
  user: [PatientUserSchema],
});

module.exports = mongoose.model("patient", PatientSchema);
