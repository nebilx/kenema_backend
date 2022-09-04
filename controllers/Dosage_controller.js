const Dosage = require("../models/Dosage_Model");
const asyncHandler = require("express-async-handler");

// @desc    get all Dosage
// @route   Get /route/Dosage
const getAllDosage = asyncHandler(async (req, res) => {
  // Check if Dosage exists
  const dosage = await Dosage.find();
  if (!dosage) return res.status(204).json({ message: "No Dosage found" });

  try {
    res.status(200).json(dosage);
  } catch (err) {
    res.status(500).send(err);
  }
});

// @desc    Register new Dosage
// @route   POST /route/Dosage
const insertDosage = asyncHandler(async (req, res) => {
  const { Dosage_name,status } = req.body;

  if (!Dosage_name||!status) {
    res.status(400).json({ message: "Please add all fields" });
  }

  // Check if Dosage exists
  const DosageExists = await Dosage.findOne({ Dosage_name });

  if (DosageExists) {
    res.status(409).json({ message: "Dosage already exists" }); // 409 conflict
  }

  try {
    const result = await Dosage.create({Dosage_name,status });

    res.status(201).json({ success: `New Dosage created!` + result });
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});

// @desc    Update Dosage
// @route   Put /route/Dosage
const updateDosage = asyncHandler(async (req, res) => {
  const { Dosage_name,status} = req.body;

  if (!id) return res.status(400).json({ message: "Dosage ID required" });

  // check if Dosage exists
  const DosageExists = await Dosage.findOne({ _id: id });

  console.log(DosageExists);
  if (!DosageExists) {
    return res.status(204).json({ message: `Dosage ID ${id} not found` });
  }

  try {
    const result = await Dosage.findByIdAndUpdate(
      { _id: id },
      { Dosage_name,status }
    );

    result.save();

    res.status(201).json({ success: `Dosage Updated` + result });
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

// @desc    Delete Dosage
// @route   Delete /route/Dosage
const deleteDosage = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "Dosage ID required" });

  //check if the Dosage exist
  const DosageExists = await Dosage.findOne({ _id: id }).exec();

  if (!DosageExists) {
    return res.status(204).json({ message: `Dosage ID ${id} not found` });
  }

  try {
    const result = await Dosage.findByIdAndDelete({ _id: id });
    res.status(201).json({ success: `Dosage Deleted!` + result });
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

// @desc    Get one Dosage
// @route   Get /route/Dosage
const getDosage = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Dosage ID required" });

  const dosage = await Dosage.findOne({ _id: id }).exec();

  if (!dosage) {
    return res.status(204).json({ message: `User ID ${id} not found` });
  }
  try {
    res.status(200).json(dosage);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

module.exports = {
  getAllDosage,
  insertDosage,
  updateDosage,
  deleteDosage,
  getDosage,
};
