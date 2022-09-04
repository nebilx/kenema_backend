const Medicine = require("../models/Medicine_Model");
const asyncHandler = require("express-async-handler");

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

  const {
    medicine_id,
    name,
    type,
    mfg,
    generic_name,
    date_mfg,
    category,
    date_expire,
    price,
    strength,
    form,
    image,
  } = req.body;

  if (
    !medicine_id ||
    !name ||
    !type ||
    !mfg ||
    !generic_name ||
    !date_mfg ||
    !category ||
    !date_expire ||
    !price ||
    !strength ||
    !form ||
    !image
  ) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  // Check if Medicine exists
  const MedicineExists = await Medicine.findOne({ medicine_id, date_mfg });

  if (MedicineExists) {
    return res.status(409).json({ message: "Medicine already exists" }); // 409 conflict
  }

  try {
    const result = await Medicine.create({
      medicine_id,
      name,
      type,
      mfg,
      generic_name,
      date_mfg,
      category,
      date_expire,
      price,
      strength,
      form,
      image,
    });

    return res.status(201).json({ success: `New Medicine created!` + result });
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});

// @desc    Update Medicine
// @route   Put /route/Medicine
const updateMedicine = asyncHandler(async (req, res) => {
  const {
    id,
    medicine_id,
    name,
    type,
    mfg,
    generic_name,
    date_mfg,
    category,
    date_expire,
    price,
    strength,
    form,
    image,
  } = req.body;

  if (!id) return res.status(400).json({ message: "Medicine ID required" });

  // check if Medicine exists
  const MedicineExists = await Medicine.findOne({ _id: id });

  if (!MedicineExists) {
    return res.status(204).json({ message: `Medicine ID ${id} not found` });
  }

  try {
    const result = await Medicine.findByIdAndUpdate(
      { _id: id },
      {
        medicine_id,
        name,
        type,
        mfg,
        generic_name,
        date_mfg,
        category,
        date_expire,
        price,
        strength,
        form,
        image,
      }
    );

    await result.save();

    return res.status(201).json({ success: `Medicine Updated` + result });
  } catch (err) {
    return res.status(500).send(err);
    console.log(err);
  }
});

// @desc    Delete Medicine
// @route   Delete /route/Medicine
const deleteMedicine = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "Medicine ID required" });

  //check if the Medicine exist
  const MedicineExists = await Medicine.findOne({ _id: id }).exec();

  if (!MedicineExists) {
    return res.status(204).json({ message: `Medicine ID ${id} not found` });
  }

  try {
    const result = await Medicine.findByIdAndDelete({ _id: id });
    res.status(201).json({ success: `Medicine Deleted!` + result });
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

// @desc    Get one Medicine
// @route   Get /route/Medicine
const getMedicine = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Medicine ID required" });

  const medicine = await Medicine.findOne({ _id: id }).exec();

  if (!medicine) {
    return res.status(204).json({ message: `User ID ${id} not found` });
  }
  try {
    res.status(200).json(Medicine);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

module.exports = {
  getAllMedicine,
  insertMedicine,
  updateMedicine,
  deleteMedicine,
  getMedicine,
};
