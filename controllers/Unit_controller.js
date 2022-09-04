const Unit = require("../models/Unit_Model");
const asyncHandler = require("express-async-handler");

// @desc    get all Unit
// @route   Get /route/Unit
const getAllUnit = asyncHandler(async (req, res) => {
  // Check if Unit exists
  const unit = await Unit.find();
  if (!unit) return res.status(204).json({ message: "No Unit found" });

  try {
    res.status(200).json(unit);
  } catch (err) {
    res.status(500).send(err);
  }
});

// @desc    Register new Unit
// @route   POST /route/Unit
const insertUnit = asyncHandler(async (req, res) => {
  const { Unit_name,status } = req.body;

  if (!Unit_name||!status) {
    res.status(400).json({ message: "Please add all fields" });
  }

  // Check if Unit exists
  const UnitExists = await Unit.findOne({ Unit_name });

  if (UnitExists) {
    res.status(409).json({ message: "Unit already exists" }); // 409 conflict
  }

  try {
    const result = await Unit.create({Unit_name,status });

    res.status(201).json({ success: `New Unit created!` + result });
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});

// @desc    Update Unit
// @route   Put /route/Unit
const updateUnit = asyncHandler(async (req, res) => {
  const { Unit_name,status} = req.body;

  if (!id) return res.status(400).json({ message: "Unit ID required" });

  // check if Unit exists
  const UnitExists = await Unit.findOne({ _id: id });

  console.log(UnitExists);
  if (!UnitExists) {
    return res.status(204).json({ message: `Unit ID ${id} not found` });
  }

  try {
    const result = await Unit.findByIdAndUpdate(
      { _id: id },
      { Unit_name,status }
    );

    result.save();

    res.status(201).json({ success: `Unit Updated` + result });
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

// @desc    Delete Unit
// @route   Delete /route/Unit
const deleteUnit = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "Unit ID required" });

  //check if the Unit exist
  const UnitExists = await Unit.findOne({ _id: id }).exec();

  if (!UnitExists) {
    return res.status(204).json({ message: `Unit ID ${id} not found` });
  }

  try {
    const result = await Unit.findByIdAndDelete({ _id: id });
    res.status(201).json({ success: `Unit Deleted!` + result });
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

// @desc    Get one Unit
// @route   Get /route/Unit
const getUnit = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Unit ID required" });

  const unit = await Unit.findOne({ _id: id }).exec();

  if (!unit) {
    return res.status(204).json({ message: `User ID ${id} not found` });
  }
  try {
    res.status(200).json(unit);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

module.exports = {
  getAllUnit,
  insertUnit,
  updateUnit,
  deleteUnit,
  getUnit,
};
