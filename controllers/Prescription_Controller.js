const Prescription = require("../models/Prescription_Model");
const asyncHandler = require("express-async-handler");

// @desc    get all Prescription
// @route   Get /route/Prescription
const getAllPrescription = asyncHandler(async (req, res) => {
  // Check if Prescription exists
  const Prescription = await Prescription.find();
  if (!Prescription) return res.status(204).json({ message: "No Prescription found" });

  try {
    return res.status(200).json(Prescription);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Register new Prescription
// @route   POST /route/Prescription
const insertPrescription = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { Prescription_name, status } = req.body;

  if (!Prescription_name || !status) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  // Check if Prescription exists
  const PrescriptionExists = await Prescription.findOne({ Prescription_name });

  if (PrescriptionExists) {
    return res.status(409).json({ message: "Prescription already exists" }); // 409 conflict
  }

  try {
    const result = await Prescription.create({ Prescription_name, status });

    return res.status(201).json({ success: `New Prescription created!` + result });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Update Prescription
// @route   Put /route/Prescription
const updatePrescription = asyncHandler(async (req, res) => {
  const { id, Prescription_name, status } = req.body;

  if (!id) return res.status(400).json({ message: "Prescription ID required" });

  // check if Prescription exists
  const PrescriptionExists = await Prescription.findOne({ _id: id });

  console.log(PrescriptionExists);
  if (!PrescriptionExists) {
    return res.status(204).json({ message: `Prescription ID ${id} not found` });
  }

  try {
    const result = await Prescription.findByIdAndUpdate(
      { _id: id },
      {
        $set: { Prescription_name },
        $set: { status }
      }
    );

    result.save();

    return res.status(201).json({ success: `Prescription Updated` + result });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Delete Prescription
// @route   Delete /route/Prescription
const deletePrescription = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "Prescription ID required" });

  //check if the Prescription exist
  const PrescriptionExists = await Prescription.findOne({ _id: id }).exec();

  if (!PrescriptionExists) {
    return res.status(204).json({ message: `Prescription ID ${id} not found` });
  }

  try {
    const result = await Prescription.findByIdAndDelete({ _id: id });
    return res.status(201).json({ success: `Prescription Deleted!` + result });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Get one Prescription
// @route   Get /route/Prescription
const getPrescription = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Prescription ID required" });

  const Prescription = await Prescription.findOne({ _id: id }).exec();

  if (!Prescription) {
    return res.status(204).json({ message: `User ID ${id} not found` });
  }
  try {
    return res.status(200).json(Prescription);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = {
  getAllPrescription,
  insertPrescription,
  updatePrescription,
  deletePrescription,
  getPrescription,
};
