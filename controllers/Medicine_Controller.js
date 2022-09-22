const Medicine = require("../models/Medicine_Model");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");

// @desc    get all Medicine
// @route   Get /route/Medicine
const getAllMedicine = asyncHandler(async (req, res) => {
  // Check if Medicine exists
  const medicine = await Medicine.find();
  if (!medicine) return res.status(204).json({ message: "No Medicine found" });

  try {
    return res.status(200).json(medicine);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Register new Medicine
// @route   POST /route/Medicine
const insertMedicine = asyncHandler(async (req, res) => {
  const { medicine_id, name, mfg, generic_name, strength, unit, status } =
    req.body;

  if (
    !medicine_id ||
    !name ||
    !mfg ||
    !generic_name ||
    !strength ||
    !unit ||
    !status
  ) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  // Check if Medicine exists
  const MedicineExists = await Medicine.findOne({ medicine_id });

  if (MedicineExists) {
    return res.status(409).json({ message: "Medicine already exists" }); // 409 conflict
  }

  try {
    // Upload image to cloudinary
    const mresult = await cloudinary.uploader.upload(req.file.path, {
      folder: "medicine_image",
      width: 150,
      height: 300,
      crop: "fill",
    });
    console.log(mresult);

    const medicine = new Medicine({
      medicine_id,
      name,
      mfg,
      generic_name,
      strength,
      unit,
      image: {
        public_id: mresult.public_id,
        url: mresult.secure_url,
      },
      status,
    });

    await medicine.save();

    return res
      .status(201)
      .json({ success: `New Medicine created!` + medicine });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Update Medicine
// @route   Put /route/Medicine
const updateMedicine = asyncHandler(async (req, res) => {
  const { id, medicine_id, name, mfg, generic_name, strength, unit, status } =
    req.body;

  if (!id) return res.status(400).json({ message: "Medicine ID required" });

  // check if Medicine exists
  const medicine = await Medicine.findOne({ _id: id });

  if (!medicine) {
    return res.status(204).json({ message: `Medicine ID ${id} not found` });
  }

  if (!req.file) {
    try {
      const mupdate = await Medicine.findOneAndUpdate(
        { _id: id },
        {
          $set: { medicine_id },
          $set: { name },
          $set: { mfg },
          $set: { generic_name },
          $set: { strength },
          $set: { unit },
          $set: { status },
        }
      );

      mupdate.save();

      return res.status(201).json({ success: `Medicine Updated` + mupdate });
    } catch (err) {
      return res.status(500).send(err);
    }
  } else {
    try {
      // Delete image from cloudinary
      const Delete = await cloudinary.uploader.destroy(
        medicine.image.public_id
      );

      // Upload image to cloudinary
      const mresult = await cloudinary.uploader.upload(req.file.path, {
        folder: "medicine_image",
        width: 150,
        height: 300,
        crop: "fill",
      });

      try {
        const mupdate = await Medicine.findByIdAndUpdate(
          { _id: id },
          {
            $set: { medicine_id },
            $set: { name },
            $set: { mfg },
            $set: { generic_name },
            $set: { strength },
            $set: { unit },
            $set: {
              image: {
                public_id: mresult.public_id,
                url: mresult.secure_url,
              },
            },
            $set: { status },
          }
        );

        mupdate.save();

        return res.status(201).json({ success: `Medicine Updated` + mupdate });
      } catch (errr) {
        return res.status(500).send(errr);
      }
    } catch (err) {
      return res.status(500).send(err);
    }
  }
});

// @desc    Delete Medicine
// @route   Delete /route/Medicine
const deleteMedicine = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "Medicine ID required" });

  try {
    //check if the Medicine exist
    const medicine = await Medicine.findById({ _id: id });

    if (!medicine) {
      return res.status(204).json({ message: `Medicine ID ${id} not found` });
    }

    // Delete image from cloudinary
    await cloudinary.uploader.destroy(medicine.image.public_id);
    // Delete user from db
    await medicine.remove();

    return res.status(201).json({ success: `Medicine Deleted!` + medicine });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Get one Medicine
// @route   Get /route/Medicine
const getMedicine = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "Medicine ID required" });

  const medicine = await Medicine.findOne({ _id: id }).exec();

  if (!medicine) {
    return res.status(204).json({ message: `User ID ${id} not found` });
  }
  try {
    return res.status(200).json(medicine);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = {
  getAllMedicine,
  insertMedicine,
  updateMedicine,
  deleteMedicine,
  getMedicine,
};
