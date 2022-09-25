const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InsuranceUserSchema = new Schema(
  {
    //insurance user name
    name: {
      type: String,
      required: [true, "insurance user name is required"],
    },
    //insurance user age
    age: {
      type: String,
      required: [true, "insurance user  age is required"],
    },
    //insurance user gender
    gender: {
      type: String,
      required: [true, "insurance user gender is required"],
    },
    //insurance user dob
    dob: {
      type: String,
      required: [true, "insurance user  dob is required"],
    },

    //insurance user  phone number
    pno: {
      type: Number,
      required: [true, "insurance user  phone number is required"],
    },

    // insurance user  city
    city: {
      type: Number,
      required: [true, "city is required"],
    },
    // insurance user  sub_city
    sub_city: {
      type: Number,
      required: [true, "sub-city is required"],
    },
    // insurance user  woreda
    woreda: {
      type: Number,
      required: [true, " woreda is required"],
    },
    // insurance user  house no
    house_no: {
      type: Number,
      required: [true, "house no is required"],
    },

    //insurance user image
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Insurance_User", InsuranceUserSchema);
