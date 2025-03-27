const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Files will be stored in the "uploads/" folder
  },
  filename: (req, file, cb) => {
    // Create a unique filename with a timestamp
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
module.exports = upload;
