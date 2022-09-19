const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  
  email: {
    type: String,
    required: [true, "email is required"],
  },
  p_pwd: {
    type:String,
    required: [true, "password is required"],

  },

  image:{
    public_id:{
        type:String,
        required: [true, "publid id is required"],

    },
    url:{
        type:String,
        required: [true, "url is required"],
    }

  },
  
  //Status active or inactive
  status: {
    type: String,
    required: [true, "status is required"],
  },
});

module.exports = mongoose.model("User", UserSchema);
