const Package = require("../models/Package_model");
const asyncHandler = require("express-async-handler");

// @desc    get all Package
// @route   Get /route/Package
const getAllPackage = asyncHandler(async (req, res) => {
  // Check if Package exists
  const package = await Package.find();
  if (!package) return res.status(204).json({ message: "No Package found" });

  try {
    return res.status(200).json(package);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Register new Package
// @route   POST /route/Package
const insertPackage = asyncHandler(async (req, res) => {
  const { package_name, status } = req.body;

  if (!package_name || !status) {
    res.status(400).json({ message: "Please add all fields" });
  }

  // Check if Package exists
  const PackageExists = await Package.findOne({ package_name });

  if (PackageExists) {
    res.status(409).json({ message: "Package already exists" }); // 409 conflict
  }

  try {
    const result = await Package.create({ package_name, status });

    return res.status(201).json({ success: `New Package created!` + result });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Update Package
// @route   Put /route/Package
const updatePackage = asyncHandler(async (req, res) => {
  const { id, package_name, status } = req.body;

  if (!id) return res.status(400).json({ message: "Package ID required" });

  // check if Package exists
  const PackageExists = await Package.findOne({ _id: id });

  console.log(PackageExists);
  if (!PackageExists) {
    return res.status(204).json({ message: `Package ID ${id} not found` });
  }

  try {
    const result = await Package.findByIdAndUpdate(
      { _id: id },
      {
        $set: { package_name },
        $set: { status },
      }
    );

    result.save();

    return res.status(201).json({ success: `Package Updated` + result });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Delete Package
// @route   Delete /route/Package
const deletePackage = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "Package ID required" });

  //check if the Package exist
  const PackageExists = await Package.findOne({ _id: id }).exec();

  if (!PackageExists) {
    return res.status(204).json({ message: `Package ID ${id} not found` });
  }

  try {
    const result = await Package.findByIdAndDelete({ _id: id });
    return res.status(201).json({ success: `Package Deleted!` + result });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Get one Package
// @route   Get /route/Package
const getPackage = asyncHandler(async (req, res) => {
  console.log(req.params.id);

  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "Package ID required" });

  const package = await Package.findOne({ _id: id }).exec();

  if (!package) {
    return res.status(204).json({ message: `User ID ${id} not found` });
  }
  try {
    return res.status(200).json(package);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = {
  getAllPackage,
  insertPackage,
  updatePackage,
  deletePackage,
  getPackage,
};
