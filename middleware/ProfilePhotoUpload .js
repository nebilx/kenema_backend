const multer = require("multer");

const sharp = require("sharp");
 
const path = require("path");
//storage
const multerStorage = multer.memoryStorage();

//file type checking 
//cb callback
const multerFilter = (req,file,cb) =>{
    //check file type 

    if(file.mimetype.startsWith("image")){
    
cb(null,true)     //there is nothing wrong then pass the image
    }
    else{
        //rejected files 
        cb({
            message:"Unsupported file format",
        }, false)
    }
};


const profilePhotoUpload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    //limit amount of file size to be uploaded 
    limits: {fileSize:1000000}
});


//Image Resize
const profilePhotoResize = async(req,res,next) => {

    //check if there is not file
    if(!req.file) return next();

    req.file.filename = `user-${Date.now()}-${req.file.originalname}`

   // console.log("Resizing", req.file);
         
await sharp (req.file.buffer)
.resize(250,250)
.toFormat("jpeg")
.jpeg({quality:90})
.toFile(path.join(`uploads/${req.file.filename}`));
next();


}
module.exports = {profilePhotoUpload, profilePhotoResize} ;