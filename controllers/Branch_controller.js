const Branch = require("../models/Branch_Model");
const asyncHandler = require("express-async-handler");

// @desc    get all Branch
// @route   Get /route/branch
const getAllBranch = asyncHandler(async (req, res) => {
  // Check if Branch exists
  const branch = await Branch.find();
  if (!branch) return res.status(204).json({ message: "No Branch found" });

  try {
    return res.status(200).json(branch);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Register new Branch
// @route   POST /route/branch
const insertBranch = asyncHandler(async (req, res) => {
  const { name, pno, address, longitude, latitude, status } = req.body;

  if (!name || !pno || !address || !longitude || !latitude || !status) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  // Check if Branch exists
  const BranchExists = await Branch.findOne({ name });

  if (BranchExists) {
    return res.status(409).json({ message: "Branch already exists" }); // 409 conflict
  }

  try {
    const branch = new Branch({
      name,
      pno,
      address,
      location: {
        longitude,
        latitude,
      },
      status,
    });

    await branch.save();
    return res.status(201).json({ success: `New Branch created!` + branch });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Update Branch
// @route   Put /route/branch
const updateBranch = asyncHandler(async (req, res) => {
  const { name, pno, address, longitude, latitude, status } = req.body;

  if (!id) return res.status(400).json({ message: "Branch ID required" });

  // check if Branch exists
  const BranchExists = await Branch.findOne({ _id: id });

  if (!BranchExists) {
    return res.status(204).json({ message: `Branch ID ${id} not found` });
  }

  try {
    const branch = await Branch.findByIdAndUpdate(
      { _id: id },
      {
        $set: { name },
        $set: { pno },
        $set: { address },
        $set: {
          location: {
            longitude,
            latitude,
          },
        },
        $set: { status },
      }
    );

    await branch.save();

    return res.status(201).json({ success: `Branch Updated` + branch });
  } catch (err) {
    return res.status(500).send(err);
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
    const branch = await Branch.findByIdAndDelete({ _id: id });
    return res.status(201).json({ success: `Branch Deleted!` + branch });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Get one Branch
// @route   Get /route/branch
const getBranch = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "Branch ID required" });

  const branch = await Branch.findOne({ _id: id }).exec();

  if (!branch) {
    return res.status(204).json({ message: `Branch ID ${id} not found` });
  }
  try {
    return res.status(200).json(branch);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = {
  getAllBranch,
  insertBranch,
  updateBranch,
  deleteBranch,
  getBranch,
};
