const Dosage = require("../models/Dosage_Model");
const Package = require("../models/Package_Model");
const Type = require("../models/Type_model");
const Unit = require("../models/Unit_model");
const asyncHandler = require("express-async-handler");

// @desc    get all Dosage, Package,Type,Unit status active
// @route   Get /route/med_content
const getMed_content = asyncHandler(async (req, res) => {
  // Check if data exists
  const Status = { status: "active" };
  const dosage = await Dosage.find(Status);
  const package = await Package.find(Status);
  const type = await Type.find(Status);
  const unit = await Unit.find(Status);

  if (!Package || !Dosage || !Type || !Unit)
    return res.status(204).json({ message: "No active data found" });

  const data = { package, dosage, type, unit };

  try {
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = getMed_content;
