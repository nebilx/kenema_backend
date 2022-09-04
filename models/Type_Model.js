const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DosageSchema = new Schema({

  // type drug name 
  type_name: {
    type:string,
    required: [true, "drug type name is required"]
  },
  
  //Status active or inactive
  status: {
    type: String,
    required: [true, "status is required"],
  },


 
});

module.exports = mongoose.model("Type", DosageSchema);
