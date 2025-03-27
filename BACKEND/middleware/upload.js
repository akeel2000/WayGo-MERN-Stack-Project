const multer = require("multer");
const path = require("path");

// Configure multer to save files to the "uploads" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Create a unique filename (e.g., timestamp + original name)
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
