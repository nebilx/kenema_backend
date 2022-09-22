const Prescription = require("../models/Prescription_Model");
const asyncHandler = require("express-async-handler");

// @desc    get all Prescription
// @route   Get /route/Prescription
const getAllPrescription = asyncHandler(async (req, res) => {
  // Check if Prescription exists
  const Prescription = await Prescription.find();
  if (!Prescription)
    return res.status(204).json({ message: "No Prescription found" });

  try {
    return res.status(200).json(Prescription);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Register new Prescription
// @route   POST /route/Prescription
const insertPrescription = asyncHandler(async (req, res) => {
  const {
    Prescription_id,
    Prescription_date,
    insurance_user_id,
    hospital_name,
    medicine_name,
    dosage,
    refill_date,
    duration,
    take_time,
    branch,
    status,
  } = req.body;

  if (
    Prescription_id ||
    !Prescription_date ||
    !insurance_user_id ||
    !hospital_name ||
    !medicine_name ||
    !dosage ||
    !refill_date ||
    !duration ||
    !take_time ||
    !branch ||
    !status
  ) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  // Check if Prescription exists
  const PrescriptionExists = await Prescription.findOne({ Prescription_id });

  if (PrescriptionExists) {
    return res.status(409).json({ message: "Prescription already exists" }); // 409 conflict
  }

  try {
    const prescription = new Prescription({
      Prescription_id,
      Prescription_date,
      insurance_user_id,
      hospital_name,
      medicine_name,
      dosage,
      refill_date,
      duration,
      take_time,
      branch,
      status,
    });

    await prescription.save();
    return res
      .status(201)
      .json({ success: `New Prescription created!` + prescription });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Update Prescription
// @route   Put /route/Prescription
const updatePrescription = asyncHandler(async (req, res) => {
  const {
    id,
    medicine_name,
    dosage,
    refill_date,
    duration,
    take_time,
    status,
  } = req.body;
  if (!id) return res.status(400).json({ message: "Prescription ID required" });

  // check if Prescription exists
  const PrescriptionExists = await Prescription.findOne({ _id: id });

  if (!PrescriptionExists) {
    return res.status(204).json({ message: `Prescription ID ${id} not found` });
  }

  try {
    const prescription = await Prescription.findByIdAndUpdate(
      { _id: id },
      {
        $set: { medicine_name },
        $set: { dosage },
        $set: { refill_date },
        $set: { duration },
        $set: { take_time },
        $set: { status },
      }
    );

    prescription.save();

    return res
      .status(201)
      .json({ success: `Prescription Updated` + prescription });
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
    const prescription = await Prescription.findByIdAndDelete({ _id: id });
    return res
      .status(201)
      .json({ success: `Prescription Deleted!` + prescription });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Get one Prescription
// @route   Get /route/Prescription
const getPrescription = asyncHandler(async (req, res) => {
  console.log(req.params.id);

  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "Prescription ID required" });

  const prescription = await Prescription.findOne({ _id: id }).exec();

  if (!prescription) {
    return res.status(204).json({ message: `User ID ${id} not found` });
  }
  try {
    return res.status(200).json(prescription);
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
