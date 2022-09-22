const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pharmacy_UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },

    uname: {
      type: String,
      required: [true, "uname is required"],
    },

    pwd: {
      type: String,
      required: [true, "password is required"],
    },

    // user image
    image: {
      public_id: {
        type: String,
        required: [true, "public id id is required"],
      },
      url: {
        type: String,
        required: [true, "url is required"],
      },
    },

    // role of user
    role: {
      type: String,
      required: [true, "role is required"],
    },

    //branch name
    branch: {
      type: String,
      required: [true, "branch is required"],
    },

    //Status active or inactive
    status: {
      type: String,
      required: [true, "status is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pharmacy_User_Account", Pharmacy_UserSchema);
