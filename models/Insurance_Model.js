const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InsuranceSchema = new Schema({
 
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

});

module.exports = mongoose.model("Insurance", InsuranceSchema);
