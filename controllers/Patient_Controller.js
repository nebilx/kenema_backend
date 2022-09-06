const Patient = require("../models/Patient_Model");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");

// @desc    get all Patient
// @route   Get /route/Patient
const getAllPatient = asyncHandler(async (req, res) => {
  // Check if Patient exists
  const patient = await Patient.find();
  if (!patient) return res.status(204).json({ message: "No Patient found" });

  try {
    return res.status(200).json(patient);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Register new Patient
// @route   POST /route/Patient
const insertPatient = asyncHandler(async (req, res) => {
  const { image, insurance_image } = req.files;
  console.log(image, insurance_image);
  console.log("........./////////..........");
  const {
    name,
    age,
    gender,
    dob,
    pno,
    city,
    sub_city,
    woreda,
    house_no,
    insurance_id,
    insurance_name,
    uname,
    upwd,
    status,
  } = req.body;

  if (
    !name ||
    !age ||
    !gender ||
    !dob ||
    !pno ||
    !image ||
    !city ||
    !sub_city ||
    !woreda ||
    !house_no ||
    !insurance_id ||
    !insurance_name ||
    !insurance_image ||
    !uname ||
    !upwd ||
    !status
  ) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  // Check if Patient exists
  const PatientExists = await Patient.findOne({ pno });

  if (PatientExists) {
    return res.status(409).json({ message: "Patient already exists" }); // 409 conflict
  }

  try {
    //Upload to cloudinary

    const p_imageUploaded = await cloudinary.uploader.upload(image, {
      folder: "Patient_image",
      width: 150,
      height: 300,
      crop: "fill",
    });

    const i_imageUploaded = await cloudinary.uploader.upload(insurance_image, {
      folder: "Insurance_image",
      width: 150,
      height: 300,
      crop: "fill",
    });

    if (!p_imageUploaded || !i_imageUploaded) {
      console.log("something went wrong");
    }

    console.log(p_imageUploaded, i_imageUploaded);

    const patient = await Patient.create({
      name,
      age,
      gender,
      dob,
      pno,
      p_image: {
        public_id: p_imageUploaded.public_id,
        url: p_imageUploaded.secure_url,
      },
      address: {
        city,
        sub_city,
        woreda,
        house_no,
      },

      insurance: {
        insurance_id,
        insurance_name,
        insurance_image: {
          public_id: i_imageUploaded.public_id,
          url: i_imageUploaded.secure_url,
        },
      },
      user: {
        user_name: uname,
        user_pwd: upwd,
        status,
      },
    });

    return res.status(201).json({ success: `New Patient created!` + patient });
  } catch (err) {
    return res.status(500).send(err);
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
    pno,
    image,
    city,
    sub_city,
    woreda,
    house_no,
    insurance_id,
    insurance_name,
    insurance_image,
    uname,
    upwd,
    status,
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
      {
        name,
        age,
        gender,
        dob,
        pno,
        image,
        address: {
          city,
          sub_city,
          woreda,
          house_no,
        },

        insurance: {
          insurance_id,
          insurance_name,
          insurance_image,
        },
        user: {
          user_name: uname,
          user_pwd: upwd,
          status,
        },
      }
    );

    patient.save();

    return res.status(201).json({ success: `Patient Updated` + patient });
  } catch (err) {
    return res.status(500).send(err);
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
    return res.status(201).json({ success: `Patient Deleted!` + patient });
  } catch (err) {
    return res.status(500).send(err);
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
    return res.status(200).json(Patient);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = {
  getAllPatient,
  insertPatient,
  updatePatient,
  deletePatient,
  getPatient,
};
