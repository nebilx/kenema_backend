const Pharmacy = require("../models/Pharmacy_User_Model");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const cloudinary = require("../utils/cloudinary");
const JWT = require("jsonwebtoken");


// @desc    get all Pharmacy User
// @route   Get /route/PharmacyUser
const getAllPharmacyUser = asyncHandler(async (req, res) => {
  // Check if Medicine exists
  const pharmacy = await Pharmacy.find();
  if (!pharmacy) return res.status(204).json({ message: "No pharmacy user found" });

  try {
    return res.status(200).json(pharmacy);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Authenticate a Pharmacy User
// @route   POST /route/PharmacyUser
const insertPharmacyUser = asyncHandler(async (req, res) => {
  const { name, uname, pwd, role, branch, status } = req.body;

  console.log(req.body);
  console.log(req.path);

  if (!name || !uname || !pwd || !role || !branch || !status) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  // Check if Pharmacist exists
  const PharmacyExists = await Pharmacy.findOne({ name, uname });

  if (PharmacyExists) {
    return res.status(409).json({ message: "Pharmacy User already exists" }); // 409 conflict
  }

  try {
    // Hash password before saving to database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pwd, salt);

    if (!req.file) {
      console.log("no image ");
      return res.status(400).json({ message: "Please need image" });
    }

    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "pharmacy_user_image",
      width: 150,
      height: 300,
      crop: "fill",
    });
    console.log(result);

    const pharmacy = new Pharmacy({
      name,
      uname,
      pwd: hashedPassword,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      role,
      branch,
      status,
    });

    await pharmacy.save();

    // Do not include sensitive information in JWT
    const accessToken = JWT.sign(
      { name, branch },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1m",
      }
    );

    return res.status(201).json({
      success: `New User created!` + pharmacy + `access token` + accessToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

// @desc    Update Pharmacy User
// @route   Put /route/PharmacyUser
const updatePharmacyUser = asyncHandler(async (req, res) => {
  const { id, name, uname, role, branch, status } = req.body;

  if (!id) return res.status(400).json({ message: "Medicine ID required" });

  // check if pharmacy user exists
  const pharmacy = await Pharmacy.findOne({ _id: id });

  if (!pharmacy) {
    return res
      .status(204)
      .json({ message: `pharmacy user ID ${id} not found` });
  }

  if (!req.file) {
    try {
      const pupdate = await Pharmacy.findOneAndUpdate(
        { _id: id },
        {
          $set: { name },
          $set: { uname },
          $set: { role },
          $set: { branch },
          $set: { status },
        }
      );

      pupdate.save();

      return res
        .status(201)
        .json({ success: `Pharmacy user Updated` + mupdate });
    } catch (err) {
      return res.status(500).send(err);
    }
  } else {
    try {
      // Delete image from cloudinary
      const Delete = await cloudinary.uploader.destroy(
        pharmacy.image.public_id
      );

      // Upload image to cloudinary
      const presult = await cloudinary.uploader.upload(req.file.path, {
        folder: "medicine_image",
        width: 150,
        height: 300,
        crop: "fill",
      });

      try {
        const pupdate = await Pharmacy.findByIdAndUpdate(
          { _id: id },
          {
            $set: { name },
            $set: { uname },
            $set: { role },
            $set: { branch },
            $set: {
              image: {
                public_id: presult.public_id,
                url: presult.secure_url,
              },
            },
            $set: { status },
          }
        );

        pupdate.save();

        return res
          .status(201)
          .json({ success: `Pharmacy User Updated` + pupdate });
      } catch (errr) {
        return res.status(500).send(errr);
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  }
});

// @desc    Delete Pharmacy User
// @route   Delete /route/PharmacyUser
const deletePharmacyUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "Medicine ID required" });

  try {
    //check if the Medicine exist
    const pharmacy = await Pharmacy.findById({ _id: id });

    if (!pharmacy) {
      return res.status(204).json({ message: `Medicine ID ${id} not found` });
    }

    // Delete image from cloudinary
    await cloudinary.uploader.destroy(pharmacy.image.public_id);
    // Delete user from db
    await pharmacy.remove();

    return res.status(201).json({ success: `Medicine Deleted!` + medicine });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Get one Pharmacy User
// @route   Get /route/Pharmacy User
const getPharmacyUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "Medicine ID required" });

  const pharmacy = await Pharmacy.findOne({ _id: id }).exec();

  if (!pharmacy) {
    return res.status(204).json({ message: `User ID ${id} not found` });
  }
  try {
    return res.status(200).json(pharmacy);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = {
  getAllPharmacyUser,
  insertPharmacyUser,
  updatePharmacyUser,
  deletePharmacyUser,
  getPharmacyUser,
};
