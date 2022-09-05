const expressAsyncHandler = require("express-async-handler");

const cloudinaryUploadImg = require("../Utils/cloudinary");

const fs = require("fs");

const profilePhotoUploadCtrl = expressAsyncHandler(async (req, res) => {
  //1. get path to image

  const localPath = `uploads/${req.file.filename}`;
  //2 Upload to cloudinary

  const imgUploaded = await cloudinaryUploadImg(localPath);

  console.log(imgUploaded);
  res.json(localPath);

  //remove upload img from folder
  //fs.unlinkSync(localPath);
});

module.exports = profilePhotoUploadCtrl;
