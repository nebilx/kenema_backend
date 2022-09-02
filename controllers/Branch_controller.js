const Branch = require("../models/Branch_Model");
const asyncHandler = require("express-async-handler");

// @desc    get all Branch
// @route   Get /route/branch
const getAllBranch = asyncHandler(async (req, res) => {
  // Check if Branch exists
  const branch = await Branch.find();
  if (!branch) return res.status(204).json({ message: "No Branch found" });

  try {
    res.json(branch);
  } catch (err) {
    res.status(500).send(err);
  }
});

// @desc    Register new Branch
// @route   POST /route/branch
const insertBranch = asyncHandler(async (req, res) => {
  const { name, pno, address } = req.body;

  if (!name || !pno || !address) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if Branch exists
  const BranchExists = await Branch.findOne({ name });

  if (BranchExists) {
    res.status(409);
    throw new Error("Branch already exists"); // 409 conflict
  }

  try {
    const result = await Branch.create({ name, pno, address });

    res.status(201).json({ success: `New Branch created!` + result });
  } catch (err) {
    console.error(err);
  }
});

// @desc    Update Branch
// @route   Put /route/branch
const updateBranch = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { id, name, pno, address } = req.body;

  if (!id) return res.status(400).json({ message: "Branch ID required" });

  // check if Branch exists
  const BranchExists = await Branch.findOne({ _id: id });

  console.log(BranchExists);
  if (!BranchExists) {
    return res.status(204).json({ message: `Branch ID ${id} not found` });
  }

  try {
    const result = await Branch.findByIdAndUpdate(
      { _id: id },
      {
        $set: { name },
        $set: { pno },
        $set: { address },
      }
    );

    result.save();

    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

// @desc    Delete Branch
// @route   Delete /route/branch
const deleteBranch = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "Branch ID required" });

  //check if the Branch exist
  const BranchExists = await Branch.findOne({ _id: id }).exec();

  if (!BranchExists) {
    return res.status(204).json({ message: `Branch ID ${id} not found` });
  }

  try {
    const result = await Branch.findByIdAndDelete({ _id: id });
    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

// @desc    Get one Branch
// @route   Get /route/branch
const getBranch = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Branch ID required" });

  const result = await Branch.findOne({ _id: id }).exec();

  if (!branch) {
    return res.status(204).json({ message: `User ID ${id} not found` });
  }
  res.json(branch);
});

module.exports = {
  getAllBranch,
  insertBranch,
  updateBranch,
  deleteBranch,
  getBranch,
};
