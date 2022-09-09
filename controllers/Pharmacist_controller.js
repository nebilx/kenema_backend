const Pharmacist = require("../models/Pharmacist_Model");
const asyncHandler = require("express-async-handler");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

// @desc    get all Pharmacist
// @route   Get /route/Pharmacist
const getAllPharmacist = asyncHandler(async (req, res) => {
  // Check if Pharmacist exists
  const pharmacist = await Pharmacist.find();
  if (!pharmacist) return res.status(204).json({ message: "No Pharmacist found" });

  try {
    return res.status(200).json(pharmacist);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Register new Pharmacist
// @route   POST /route/Pharmacist
const insertPharmacist = asyncHandler(async (req, res) => {

  const {
    name,
    p_pwd,
    status,
  } = req.body;

  console.log("gebtual");
// console.log(req.file.path);
console.log(req.body);

  if (!name || !p_pwd || !status ) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  // Check if Pharmacist exists
  const PharmacistExists = await Pharmacist.findOne({ name });

  if (PharmacistExists) {
    return res.status(409).json({ message: "Pharmacist already exists" }); // 409 conflict
  }

  try {

 // Upload image to cloudinary
 const result = await cloudinary.uploader.upload(req.file.path,{
  folder:"pharmacist_image",
      width: 150,
      height: 300,
      crop: "fill",
    });
    console.log(result);
    

    const pharmacist = new Pharmacist({
      name,
      p_pwd,
        image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
        status,
      },
    );

    await pharmacist.save();

    // const pharmacist = await Pharmacist.create({ 
    //   name,
    //   p_pwd,
    //     image: {
    //     public_id: result.public_id,
    //     url: result.secure_url,
    //   },
    //     status,
    //   },
    // );


    return res.status(201).json({ success: `New Pharmacist created!` + pharmacist });
   } catch (err) {
    console.log(err);
    return  res.status(500).send(err);
  }
});

// @desc    Update Pharmacist
// @route   Put /route/Pharmacist
const updatePharmacist = asyncHandler(async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const {
    id,
    name,
    p_pwd,
    image,
    status,
  } = req.body;


  if (!id) return res.status(400).json({ message: "Pharmacist ID required" });

  // check if Pharmacist exists
  const pharmacist = await Pharmacist.findOne({ _id: id });

  if (!pharmacist) {
    return res.status(204).json({ message: `Pharmacist ID ${id} not found` });
  }
console.log(pharmacist);
// if(req.file == undefined) {
//   try {
//     const pupdate = await Pharmacist.findByIdAndUpdate(
//       { _id: id },
//       {
//         name,
//         p_pwd,
//           image: {
//           url: image,
//         },
//           status,
//       }
//     );

//     Pharmacist.save();

//     return res.status(201).json({ success: `Pharmacist Updated` + pupdate });
//   } catch (err) {
//     return res.status(500).send(err);
//   }
// }

// else {
  try {
    console.log("try gebtaul");
    // Delete image from cloudinary
   const delet =  await cloudinary.uploader.destroy(pharmacist.image.public_id);
    // Upload image to cloudinary
    // let result;
    // if (req.file) {
console.log("------/////");
    console.log(delet);
  const result = await cloudinary.uploader.upload(req.file.path);
   // }
console.log("dersal");
console.log(result);
try {
    const pupdate = await Pharmacist.findByIdAndUpdate(
      { _id: id },
      {
        name,
        p_pwd,
        image: {
          public_id: result.public_id,
          url: result.secure_url,
        },
          status,
      }
    );

    Pharmacist.save();

    return res.status(201).json({ success: `Pharmacist Updated` + pupdate });
}
catch(errr) {   return res.status(500).send(err);}
  } catch (err) {
    return res.status(500).send(err);
  }
});


// @desc    Delete Pharmacist
// @route   Delete /route/Pharmacist
const deletePharmacist = asyncHandler(async (req, res) => {
  const { id } = req.body;
  console.log(id);

  if (!id) return res.status(400).json({ message: "Pharmacist ID required" });

  try {

      //check if the Pharmacist exist
  const pharmacist = await Pharmacist.findById({ _id: id });

  if (!pharmacist) {
    return res.status(204).json({ message: `Pharmacist ID ${id} not found` });
  }

    // const pharmacist = await Pharmacist.findByIdAndDelete({ _id: id });
    // return res.status(201).json({ success: `Pharmacist Deleted!` + pharmacist });

      // Delete image from cloudinary
      await cloudinary.uploader.destroy(pharmacist.image.public_id);
      // Delete user from db
      await pharmacist.remove();
      return res.status(201).json({ success: `Pharmacist Deleted!` + pharmacist });


  } catch (err) {
    return res.status(500).send(err);
  }
});

// @desc    Get one Pharmacist
// @route   Get /route/Pharmacist
const getPharmacist = asyncHandler(async (req, res) => {

  console.log(req.params.id);

  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "Pharmacist ID required" });

  const pharmacist = await Pharmacist.findOne({ _id: id }).exec();

  if (!pharmacist) {
    return res.status(204).json({ message: `User ID ${id} not found` });
  }
  try {
    return res.status(200).json(pharmacist);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = {
  getAllPharmacist,
  insertPharmacist,
  updatePharmacist,
  deletePharmacist,
  getPharmacist,
};


