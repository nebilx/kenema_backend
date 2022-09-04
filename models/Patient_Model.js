const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientUserSchema = new Schema({
    user_name : {
     type: String,
    },
    user_pwd: {
     type:String,
    },
    status:{
      type:String
    }
 });

const PatientInsuranceSchema = new Schema ({
       //Insurance id
       Insurance_id: {
        type: String,
        required: [true, "Insurance id is required"],
      },
    
       //Insurance name
       Insurance_name: {
        type: String,
        required: [true, "Insurance name is required"],
      },
      
      //Insurance age
      Insurance_image: {
        type: String,
        required: [true, "Insurance age is required"],
      },
})
 

 const PatientAddressSchema = new Schema({
  city : {
   type: String,
  },
  sub_city : {
    type: String,
   },
   woreda : {
    type: String,
   },
   house_no :{
    type: String,
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

// patient address
PatientAddress:[PatientAddressSchema],
//patient user
  PatientUser: [PatientUserSchema],
  // patient insurance
  PatientInsurance:[PatientInsuranceSchema],


});




module.exports = mongoose.model("patient", PatientSchema);
