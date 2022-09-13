const Batch = require("../models/Batch_Model");
const asyncHandler = require("express-async-handler");

// @desc    get all Batch
// @route   Get /route/Batch
const getAllBatch = asyncHandler(async (req, res) => {
  // Check if Batch exists
  const batch = await Batch.find();
  if (!batch) return res.status(204).json({ message: "No Batch found" });

  try {
    return res.status(200).json(batch);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Register new Batch
// @route   POST /route/Batch
const insertBatch = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { batch_date, medData } = req.body;

  if (!batch_date || !medData) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  // Check if Batch exists
  const BatchExists = await Batch.findOne({ batch_date });

  if (BatchExists) {
    return res.status(409).json({ message: "Medicine Batch already exists" }); // 409 conflict
  }

  try {
    //     const batch = new Batch({
    //       batch_date,
    //       batch_medicine: {
    //         medicine_name: medData[0].medname,
    //         medicine_quantity: medData[0].medexpire,
    //         medicine_expiredate: medData[0].medquantity,
    //       }
    //     });

    // await batch.save();

    const batch = await Batch.insertMany({
      batch_date,
      batch_medicine: medData,
    });

    return res.status(201).json({ success: `New Batch created!` + batch });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Update Batch
// @route   Put /route/Batch
const updateBatch = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { id, drug_expire, drug_quantity } = req.body;

  if (!id) return res.status(400).json({ message: "Batch ID required" });

  // check if Batch exists
  const BatchExists = await Batch.findOne({ _id: id });

  console.log(BatchExists);
  if (!BatchExists) {
    return res.status(204).json({ message: `Batch ID ${id} not found` });
  }

  try {
    const batch = await Batch.findByIdAndUpdate(
      { _id: id },
      { drug_expire, drug_quantity }
    );

    Batch.save();

    return res.status(201).json({ success: `Batch Updated` + batch });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Delete Batch
// @route   Delete /route/Batch
const deleteBatch = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "Batch ID required" });

  //check if the Batch exist
  const BatchExists = await Batch.findOne({ _id: id }).exec();

  if (!BatchExists) {
    return res.status(204).json({ message: `Batch ID ${id} not found` });
  }

  try {
    const batch = await Batch.findByIdAndDelete({ _id: id });
    return res.status(201).json({ success: `Batch Deleted!` + batch });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Get one Batch
// @route   Get /route/Batch
const getBatch = asyncHandler(async (req, res) => {
  console.log(req.params.id);

  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "Batch ID required" });

  const batch = await Batch.findOne({ _id: id }).exec();

  if (!batch) {
    return res.status(204).json({ message: `User ID ${id} not found` });
  }
  try {
    return res.status(200).json(batch);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = {
  getAllBatch,
  insertBatch,
  updateBatch,
  deleteBatch,
  getBatch,
};
