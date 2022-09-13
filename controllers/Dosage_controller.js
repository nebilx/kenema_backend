const Dosage = require("../models/Dosage_Model");
const asyncHandler = require("express-async-handler");

// @desc    get all Dosage
// @route   Get /route/Dosage
const getAllDosage = asyncHandler(async (req, res) => {
  // Check if Dosage exists
  const dosage = await Dosage.find();
  if (!dosage) return res.status(204).json({ message: "No Dosage found" });

  try {
    return res.status(200).json(dosage);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Register new Dosage
// @route   POST /route/Dosage
const insertDosage = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { dosage_name, status } = req.body;

  if (!dosage_name || !status) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  // Check if Dosage exists
  const DosageExists = await Dosage.findOne({ dosage_name });

  if (DosageExists) {
    return res.status(409).json({ message: "Dosage already exists" }); // 409 conflict
  }

  try {
    const result = await Dosage.create({ dosage_name, status });

    return res.status(201).json({ success: `New Dosage created!` + result });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Update Dosage
// @route   Put /route/Dosage
const updateDosage = asyncHandler(async (req, res) => {
  const { id, dosage_name, status } = req.body;

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
      {
        $set: { dosage_name },
        $set: { status },
      }
    );

    result.save();

    return res.status(201).json({ success: `Dosage Updated` + result });
  } catch (err) {
    return res.status(500).send(err);
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
    return res.status(201).json({ success: `Dosage Deleted!` + result });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Get one Dosage
// @route   Get /route/Dosage
const getDosage = asyncHandler(async (req, res) => {
  console.log(req.params.id);

  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "Dosage ID required" });

  const dosage = await Dosage.findOne({ _id: id }).exec();

  if (!dosage) {
    return res.status(204).json({ message: `User ID ${id} not found` });
  }
  try {
    return res.status(200).json(dosage);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = {
  getAllDosage,
  insertDosage,
  updateDosage,
  deleteDosage,
  getDosage,
};
