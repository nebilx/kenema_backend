const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnitSchema = new Schema({

  // unit name 
  unit_name: {
    type:string,
    required: [true, "name Unit is required"]
  },
  
  //Status active or inactive
  status: {
    type: String,
    required: [true, "status is required"],
  },


 
});

module.exports = mongoose.model("Unit", UnitSchema);
