const Patient = require("../models/Patient_Model");
const asyncHandler = require("express-async-handler");

// @desc    get all Patient
// @route   Get /route/Patient
const getAllPatient = asyncHandler(async (req, res) => {
  // Check if Patient exists
  const patient = await Patient.find();
  if (!patient) return res.status(204).json({ message: "No Patient found" });

  try {
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).send(err);
  }
});

// @desc    Register new Patient
// @route   POST /route/Patient
const insertPatient = asyncHandler(async (req, res) => { 
  const { name, age, gender, dob, address, pno, image, user_name, user_pwd } =
    req.body;

  if (!name || !age || !gender || !dob || !address || !pno || !image) {
    res.status(400).json({ message: "Please add all fields" });
  }

  // Check if Patient exists
  const PatientExists = await Patient.findOne({ age, pno });

  if (PatientExists) {
    res.status(409).json({ message: "Patient already exists" }); // 409 conflict
  }

  try {
    const patient = await Patient.create({
      name,
      age,
      gender,
      dob,
      address,
      pno,
      image,
      user_name,
      user_pwd,
    });

    res.status(201).json({ success: `New Patient created!` + patient });
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});

// @desc    Update Patient
// @route   Put /route/Patient
const updatePatient = asyncHandler(async (req, res) => {
  const {
    id,
    name,
    age,
    gender,
    dob,
    address,
    pno,
    image,
    user_name,
    user_pwd,
  } = req.body;

  if (!id) return res.status(400).json({ message: "Patient ID required" });

  // check if Patient exists
  const PatientExists = await Patient.findOne({ _id: id });

  if (!PatientExists) {
    return res.status(204).json({ message: `Patient ID ${id} not found` });
  }

  try {
    const patient = await Patient.findByIdAndUpdate(
      { _id: id },
      { name, age, gender, dob, address, pno, image, user_name, user_pwd }
    );

    patient.save();

    res.status(201).json({ success: `Patient Updated` + patient });
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

// @desc    Delete Patient
// @route   Delete /route/Patient
const deletePatient = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "Patient ID required" });

  //check if the Patient exist
  const PatientExists = await Patient.findOne({ _id: id }).exec();

  if (!PatientExists) {
    return res.status(204).json({ message: `Patient ID ${id} not found` });
  }

  try {
    const patient = await Patient.findByIdAndDelete({ _id: id });
    res.status(201).json({ success: `Patient Deleted!` + patient });
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

// @desc    Get one Patient
// @route   Get /route/Patient
const getPatient = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Patient ID required" });

  const patient = await Patient.findOne({ _id: id }).exec();

  if (!patient) {
    return res.status(204).json({ message: `User ID ${id} not found` });
  }
  try {
    res.status(200).json(Patient);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

module.exports = {
  getAllPatient,
  insertPatient,
  updatePatient,
  deletePatient,
  getPatient,
};
