const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PackageSchema = new Schema({
  // package name
  package_name: {
    type: String,
    required: [true, "package name is required"],
  },

  //Status active or inactive
  status: {
    type: String,
    required: [true, "status is required"],
  },
});

module.exports =
  mongoose.models.Package || mongoose.model("Package", PackageSchema);
