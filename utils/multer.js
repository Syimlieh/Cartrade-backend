const multer = require("multer");

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
});
  
const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "pdf") {
      cb(null, true);
    }
    else if(file.mimetype.split("/")[1] === "png") {
        cb(null, true);
    }
    else if(file.mimetype.split("/")[1] === "jpg") {
        cb(null, true);
    }
    else if(file.mimetype.split("/")[1] === "jpeg") {
        cb(null, true);
    }
    else {
      cb(new Error("File Uploaded Format Not Supported"), false);
    }
};
  
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});
  
module.exports = upload;