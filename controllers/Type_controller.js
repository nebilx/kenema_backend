const Type = require("../models/Type_Model");
const asyncHandler = require("express-async-handler");

// @desc    get all Type
// @route   Get /route/Type
const getAllType = asyncHandler(async (req, res) => {
  // Check if Type exists
  const type = await Type.find();
  if (!type) return res.status(204).json({ message: "No Type found" });

  try {
    res.status(200).json(type);
  } catch (err) {
    res.status(500).send(err);
  }
});

// @desc    Register new Type
// @route   POST /route/Type
const insertType = asyncHandler(async (req, res) => {
  const { type_name,status } = req.body;

  if (!type_name||!status) {
    res.status(400).json({ message: "Please add all fields" });
  }

  // Check if Type exists
  const TypeExists = await Type.findOne({ type_name });

  if (TypeExists) {
    res.status(409).json({ message: "Type already exists" }); // 409 conflict
  }

  try {
    const result = await Type.create({type_name,status });

    res.status(201).json({ success: `New Type created!` + result });
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});

// @desc    Update Type
// @route   Put /route/Type
const updateType = asyncHandler(async (req, res) => {
  const { type_name,status} = req.body;

  if (!id) return res.status(400).json({ message: "Type ID required" });

  // check if Type exists
  const TypeExists = await Type.findOne({ _id: id });

  console.log(TypeExists);
  if (!TypeExists) {
    return res.status(204).json({ message: `Type ID ${id} not found` });
  }

  try {
    const result = await Type.findByIdAndUpdate(
      { _id: id },
      { type_name,status }
    );

    result.save();

    res.status(201).json({ success: `Type Updated` + result });
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

// @desc    Delete Type
// @route   Delete /route/Type
const deleteType = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "Type ID required" });

  //check if the Type exist
  const TypeExists = await Type.findOne({ _id: id }).exec();

  if (!TypeExists) {
    return res.status(204).json({ message: `Type ID ${id} not found` });
  }

  try {
    const result = await Type.findByIdAndDelete({ _id: id });
    res.status(201).json({ success: `Type Deleted!` + result });
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

// @desc    Get one Type
// @route   Get /route/Type
const getType = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Type ID required" });

  const type = await Type.findOne({ _id: id }).exec();

  if (!type) {
    return res.status(204).json({ message: `User ID ${id} not found` });
  }
  try {
    res.status(200).json(type);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

module.exports = {
  getAllType,
  insertType,
  updateType,
  deleteType,
  getType,
};
