const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DosageSchema = new Schema({

  // dosage name 
  dosage_name: {
    type:string,
    required: [true, "name dosage is required"]
  },
  
  //Status active or inactive
  status: {
    type: String,
    required: [true, "status is required"],
  },


 
});

module.exports = mongoose.model("Dosage", DosageSchema);
