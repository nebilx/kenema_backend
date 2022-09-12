const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    console.log(file);
    let ext = path.extname(file.originalname);  
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },

 
    // if(file.originalname.length>6)
    //   callback(null, file.fieldname + '-' + Date.now() + file.originalname.substr(file.originalname.length-6,file.originalname.length));
    // else
    //   callback(null, file.fieldname + '-' + Date.now() + file.originalname);

});

