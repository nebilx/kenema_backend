const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BatchSchema = new Schema({

  //Drug expire
  drug_expire: {
    type: String,
    required: [true, "Drug expire is required"],
  },

  //Drug quantity
  drug_quantity: {
    type: Number,
    required: [true, "Drug quantity is required"],
  },
 
});

module.exports = mongoose.model("Medicine_Batch", BatchSchema);
