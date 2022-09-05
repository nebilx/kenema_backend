const Medicine_Batch = require("../models/Medicine_Batch_Model");
const asyncHandler = require("express-async-handler");

// @desc    get all Medicine_Batch
// @route   Get /route/Medicine_Batch
const getAllMedicine_Batch = asyncHandler(async (req, res) => {
  // Check if Medicine_Batch exists
  const medicine_Batch = await Medicine_Batch.find();
  if (!medicine_Batch)
    return res.status(204).json({ message: "No Medicine_Batch found" });

  try {
    return res.status(200).json(medicine_Batch);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Register new Medicine_Batch
// @route   POST /route/Medicine_Batch
const insertMedicine_Batch = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { drug_expire, drug_quantity } = req.body;

  if (!drug_expire || !drug_quantity) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  // Check if Medicine_Batch exists
  const Medicine_BatchExists = await Medicine_Batch.findOne({ drug_expire });

  if (!Medicine_BatchExists) {
    return res.status(409).json({ message: "Medicine Batch already exists" }); // 409 conflict
  }

  try {
    const medicine_Batch = await Medicine_Batch.create({
      drug_expire,
      drug_quantity,
    });

    return res
      .status(201)
      .json({ success: `New Medicine_Batch created!` + medicine_Batch });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Update Medicine_Batch
// @route   Put /route/Medicine_Batch
const updateMedicine_Batch = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { id, drug_expire, drug_quantity } = req.body;

  if (!id)
    return res.status(400).json({ message: "Medicine_Batch ID required" });

  // check if Medicine_Batch exists
  const Medicine_BatchExists = await Medicine_Batch.findOne({ _id: id });

  console.log(Medicine_BatchExists);
  if (!Medicine_BatchExists) {
    return res
      .status(204)
      .json({ message: `Medicine_Batch ID ${id} not found` });
  }

  try {
    const medicine_Batch = await Medicine_Batch.findByIdAndUpdate(
      { _id: id },
      { drug_expire, drug_quantity }
    );

    medicine_Batch.save();

    return res
      .status(201)
      .json({ success: `Medicine_Batch Updated` + medicine_Batch });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Delete Medicine_Batch
// @route   Delete /route/Medicine_Batch
const deleteMedicine_Batch = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id)
    return res.status(400).json({ message: "Medicine_Batch ID required" });

  //check if the Medicine_Batch exist
  const Medicine_BatchExists = await Medicine_Batch.findOne({ _id: id }).exec();

  if (!Medicine_BatchExists) {
    return res
      .status(204)
      .json({ message: `Medicine_Batch ID ${id} not found` });
  }

  try {
    const medicine_Batch = await Medicine_Batch.findByIdAndDelete({ _id: id });
    return res
      .status(201)
      .json({ success: `Medicine_Batch Deleted!` + medicine_Batch });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Get one Medicine_Batch
// @route   Get /route/Medicine_Batch
const getMedicine_Batch = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id)
    return res.status(400).json({ message: "Medicine_Batch ID required" });

  const medicine_Batch = await Medicine_Batch.findOne({ _id: id }).exec();

  if (!medicine_Batch) {
    return res.status(204).json({ message: `User ID ${id} not found` });
  }
  try {
    return res.status(200).json(medicine_Batch);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = {
  getAllMedicine_Batch,
  insertMedicine_Batch,
  updateMedicine_Batch,
  deleteMedicine_Batch,
  getMedicine_Batch,
};
