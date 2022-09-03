const Insurance = require("../models/Insurance_Model");
const asyncHandler = require("express-async-handler");

// @desc    get all Insurance
// @route   Get /route/Insurance
const getAllInsurance = asyncHandler(async (req, res) => {
  // Check if Insurance exists
  const insurance = await Insurance.find();
  if (!insurance)
    return res.status(204).json({ message: "No Insurance found" });

  try {
    res.status(200).json(insurance);
  } catch (err) {
    res.status(500).send(err);
  }
});

// @desc    Register new Insurance
// @route   POST /route/Insurance
const insertInsurance = asyncHandler(async (req, res) => {
  const { Insurance_id, Insurance_name, Insurance_image } = req.body;

  if ((!Insurance_id, !Insurance_name, !Insurance_image)) {
    res.status(400).json({ message: "Please add all fields" });
  }

  // Check if Insurance exists
  const InsuranceExists = await Insurance.findOne({
    Insurance_id,
    Insurance_name,
  });

  if (InsuranceExists) {
    res.status(409).json({ message: "Insurance already exists" }); // 409 conflict
  }

  try {
    const insurance = await Insurance.create({
      Insurance_id,
      Insurance_name,
      Insurance_image,
    });

    res.status(201).json({ success: `New Insurance created!` + insurance });
  } catch (err) {
    res.status(500).send(err);
    console.error(err);
  }
});

// @desc    Update Insurance
// @route   Put /route/Insurance
const updateInsurance = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { id, Insurance_id, Insurance_name, Insurance_image } = req.body;

  if (!id) return res.status(400).json({ message: "Insurance ID required" });

  // check if Insurance exists
  const InsuranceExists = await Insurance.findOne({ _id: id });

  console.log(InsuranceExists);
  if (!InsuranceExists) {
    return res.status(204).json({ message: `Insurance ID ${id} not found` });
  }

  try {
    const insurance = await Insurance.findByIdAndUpdate(
      { _id: id },
      { Insurance_id, Insurance_name, Insurance_image }
    );

    insurance.save();

    res.status(201).json({ success: `Insurance Updated` + insurance });
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

// @desc    Delete Insurance
// @route   Delete /route/Insurance
const deleteInsurance = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) return res.status(400).json({ message: "Insurance ID required" });

  //check if the Insurance exist
  const InsuranceExists = await Insurance.findOne({ _id: id }).exec();

  if (!InsuranceExists) {
    return res.status(204).json({ message: `Insurance ID ${id} not found` });
  }

  try {
    const insurance = await Insurance.findByIdAndDelete({ _id: id });
    res.status(201).json({ success: `Insurance Deleted!` + insurance });
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

// @desc    Get one Insurance
// @route   Get /route/Insurance
const getInsurance = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Insurance ID required" });

  const insurance = await Insurance.findOne({ _id: id }).exec();

  if (!insurance) {
    return res.status(204).json({ message: `User ID ${id} not found` });
  }
  try {
    res.status(200).json(insurance);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

module.exports = {
  getAllInsurance,
  insertInsurance,
  updateInsurance,
  deleteInsurance,
  getInsurance,
};
