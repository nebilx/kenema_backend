const Patient = require("../models/Patient_Model");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");
const { json } = require("body-parser");

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
  console.log(req.body);
  console.log(req.file);

  console.log("...........////////////////......... p_image");
  console.log(req.files.p_image[0]);
  console.log(".............///////////////..... insurance_image");
  console.log(req.files.insurance_image[0]);
  console.log("/////////////////////////--------------");
  if (
    !name ||
    !age ||
    !gender ||
    !dob ||
    !pno ||
    !city ||
    !sub_city ||
    !woreda ||
    !house_no ||
    !insurance_id ||
    !insurance_name ||
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

  console.log(PatientExists);
  console.log("reach here");

  try {
    //Upload to cloudinary

    const p_imageUploaded = await cloudinary.uploader.upload(
      req.files.p_image[0].path,
      {
        folder: "Patient_image",
        width: 150,
        height: 300,
        crop: "fill",
      }
    );

    const i_imageUploaded = await cloudinary.uploader.upload(
      req.files.insurance_image[0].path,
      {
        folder: "Insurance_image",
        width: 150,
        height: 300,
        crop: "fill",
      }
    );

    if (!p_imageUploaded || !i_imageUploaded) {
      console.log("something went wrong");
    }

    console.log(p_imageUploaded);
    console.log("//////////////....................");
    console.log(i_imageUploaded);

    const patient = new Patient({
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

    await patient.save();

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

  if (!id) return res.status(400).json({ message: "Patient ID required" });

  // check if Patient exists
  const patient = await Patient.findOne({ _id: id });

  console.log(patient);

  if (!patient) {
    return res.status(204).json({ message: `Patient ID ${id} not found` });
  }

  if (!req.files.insurance_image || !req.files.p_image) {
    console.log("no file exist");

    try {
      const pupdate = await Patient.findOneAndUpdate(
        { _id: id },
        {
          $set: { name },
          $set: { age },
          $set: { gender },
          $set: { dob },
          $set: { pno },
          $set: {
            address: {
              city,
              sub_city,
              woreda,
              house_no,
            },
          },

          $set: {
            insurance: {
              insurance_id,
              insurance_name,
            },
          },
          $set: {
            user: {
              user_name: uname,
              user_pwd: upwd,
              status,
            },
          },
        }
      );

      await pupdate.save();

      return res.status(201).json({ success: `Patient Updated!` + pupdate });
    } catch (err) {
      return res.status(500).send(err);
    }
  } else {
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(patient.p_image.public_id);
    await cloudinary.uploader.destroy(
      patient.insurance[0].insurance_image.public_id
    );

    const p_imageUploaded = await cloudinary.uploader.upload(
      req.files.p_image[0].path,
      {
        folder: "Patient_image",
        width: 150,
        height: 300,
        crop: "fill",
      }
    );

    const i_imageUploaded = await cloudinary.uploader.upload(
      req.files.insurance_image[0].path,
      {
        folder: "Insurance_image",
        width: 150,
        height: 300,
        crop: "fill",
      }
    );

    try {
      const pupdate = await Patient.findByIdAndUpdate(
        { _id: id },
        {
          $set: { name },
          $set: { age },
          $set: { gender },
          $set: { dob },
          $set: { pno },
          p_image: {
            public_id: p_imageUploaded.public_id,
            url: p_imageUploaded.secure_url,
          },
          $set: {
            address: {
              city,
              sub_city,
              woreda,
              house_no,
            },
          },

          $set: {
            insurance: {
              insurance_id,
              insurance_name,
              insurance_image: {
                public_id: i_imageUploaded.public_id,
                url: i_imageUploaded.secure_url,
              },
            },
          },
          $set: {
            user: {
              user_name: uname,
              user_pwd: upwd,
              status,
            },
          },
        }
      );

      pupdate.save();

      return res.status(201).json({ success: `Patient Updated` + pupdate });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
});

// @desc    Delete Patient
// @route   Delete /route/Patient
const deletePatient = asyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log(id);
  if (!id) return res.status(400).json({ message: "Patient ID required" });

  try {
    //check if the Patient exist
    const patient = await Patient.findById({ _id: id });

    console.log(JSON.parse(JSON.stringify(patient)));

    if (!patient) {
      return res.status(204).json({ message: `Patient ID ${id} not found` });
    }

    // Delete image from cloudinary
    await cloudinary.uploader.destroy(patient.p_image.public_id);
    await cloudinary.uploader.destroy(
      patient.insurance[0].insurance_image.public_id
    );

    // Delete patient from db
    await patient.remove();

    return res.status(201).json({ success: `Patient Deleted!` + patient });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Get one Patient
// @route   Get /route/Patient
const getPatient = asyncHandler(async (req, res) => {
  console.log(req.params.id);

  const id = req.params.id;

  if (!id) return res.status(400).json({ message: "Patient ID required" });

  const patient = await Patient.findOne({ _id: id }).exec();

  if (!patient) {
    return res.status(204).json({ message: `User ID ${id} not found` });
  }
  try {
    return res.status(200).json(patient);
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
