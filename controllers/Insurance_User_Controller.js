const Insurance_User = require("../models/Insurance_User_Model");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");

// @desc    get all Insurance_User
// @route   Get /route/Insurance_User
const getAllInsurance_User = asyncHandler(async (req, res) => {
  // Check if Insurance_User exists
  const insurance_user = await Insurance_User.find();
  if (!insurance_user)
    return res.status(204).json({ message: "No Insurance_User found" });

  try {
    return res.status(200).json(insurance_user);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Register new Insurance_User
// @route   POST /route/Insurance_User
const insertInsurance_User = asyncHandler(async (req, res) => {
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

  // Check if Insurance_User exists
  const Insurance_UserExists = await Insurance_User.findOne({ pno });

  if (Insurance_UserExists) {
    return res.status(409).json({ message: "Insurance_User already exists" }); // 409 conflict
  }

  try {
    //Upload to cloudinary

    const p_imageUploaded = await cloudinary.uploader.upload(
      req.files.p_image[0].path,
      {
        folder: "Insurance_User_image",
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

    const insurance_user = new Insurance_User({
      name,
      age,
      gender,
      dob,
      pno,
      city,
      sub_city,
      woreda,
      house_no,
      p_image: {
        public_id: p_imageUploaded.public_id,
        url: p_imageUploaded.secure_url,
      },
      insurance_id,
      insurance_name,
      insurance_image: {
        public_id: i_imageUploaded.public_id,
        url: i_imageUploaded.secure_url,
      },
      user_name: uname,
      user_pwd: upwd,
      status,
    });

    await insurance_user.save();

    return res
      .status(201)
      .json({ success: `New Insurance_User created!` + insurance_user });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Update Insurance_User
// @route   Put /route/Insurance_User
const updateInsurance_User = asyncHandler(async (req, res) => {
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

  if (!id)
    return res.status(400).json({ message: "Insurance_User ID required" });

  // check if Insurance_User exists
  const insurance_user = await Insurance_User.findOne({ _id: id });

  console.log(Insurance_User);

  if (!insurance_user) {
    return res
      .status(204)
      .json({ message: `Insurance_User ID ${id} not found` });
  }

  if (!req.files.insurance_image || !req.files.p_image) {
    console.log("no file exist");

    try {
      const pupdate = await Insurance_User.findOneAndUpdate(
        { _id: id },
        {
          $set: { name },
          $set: { age },
          $set: { gender },
          $set: { dob },
          $set: { pno },
          $set: { city },
          $set: { sub_city },
          $set: { woreda },
          $set: { house_no },
          $set: { insurance_id },
          $set: { insurance_name },
          $set: { user_name: uname },
          $set: { user_pwd: upwd },
          $set: { status },
        }
      );

      await pupdate.save();

      return res
        .status(201)
        .json({ success: `Insurance_User Updated!` + pupdate });
    } catch (err) {
      return res.status(500).send(err);
    }
  } else {
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(insurance_user.p_image.public_id);
    await cloudinary.uploader.destroy(insurance_user.insurance_image.public_id);

    const p_imageUploaded = await cloudinary.uploader.upload(
      req.files.p_image[0].path,
      {
        folder: "Insurance_User_image",
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
      const pupdate = await Insurance_User.findByIdAndUpdate(
        { _id: id },

        {
          $set: { name },
          $set: { age },
          $set: { gender },
          $set: { dob },
          $set: { pno },
          $set: { city },
          $set: { sub_city },
          $set: { woreda },
          $set: { house_no },
          $set: {
            p_image: {
              public_id: p_imageUploaded.public_id,
              url: p_imageUploaded.secure_url,
            },
          },
          $set: { insurance_id },
          $set: { insurance_name },
          $set: { user_name: uname },
          $set: {
            insurance_image: {
              public_id: i_imageUploaded.public_id,
              url: i_imageUploaded.secure_url,
            },
            $set: { user_pwd: upwd },
            $set: { status },
          },
        }
      );

      pupdate.save();

      return res
        .status(201)
        .json({ success: `Insurance_User Updated` + pupdate });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
});

// @desc    Delete Insurance_User
// @route   Delete /route/Insurance_User
const deleteInsurance_User = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id)
    return res.status(400).json({ message: "Insurance_User ID required" });

  try {
    //check if the Insurance_User exist
    const insurance_user = await Insurance_User.findById({ _id: id });

    if (!insurance_user) {
      return res
        .status(204)
        .json({ message: `Insurance_User ID ${id} not found` });
    }

    // Delete image from cloudinary
    await cloudinary.uploader.destroy(insurance_user.p_image.public_id);
    await cloudinary.uploader.destroy(insurance_user.insurance_image.public_id);

    // Delete Insurance_User from db
    await insurance_user.remove();

    return res
      .status(201)
      .json({ success: `Insurance_User Deleted!` + insurance_user });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Get one Insurance_User
// @route   Get /route/Insurance_User
const getInsurance_User = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!id)
    return res.status(400).json({ message: "Insurance_User ID required" });

  const insurance_user = await Insurance_User.findOne({ _id: id }).exec();

  if (!insurance_user) {
    return res.status(204).json({ message: `User ID ${id} not found` });
  }
  try {
    return res.status(200).json(insurance_user);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = {
  getAllInsurance_User,
  insertInsurance_User,
  updateInsurance_User,
  deleteInsurance_User,
  getInsurance_User,
};
