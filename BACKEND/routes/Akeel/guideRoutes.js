// routes/guideRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");

// Configure Multer (files stored in "uploads" folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Adjust path as needed
  },
  filename: (req, file, cb) => {
    // e.g., keep original name or generate a unique one
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

const {
  addGuide,
  getGuides,
  getGuideById,
  updateGuide,
  deleteGuide,
  addReview,
  getReviews,
} = require("../../controllers/Akeel/guideController");

const authMiddleware = require("../../middleware/authMiddleware");
const optionalAuthMiddleware = require("../../middleware/optionalAuthMiddleware");

const router = express.Router();

// Guide Management Routes (Admin-only for modifications)
// Use Multer to handle file uploads for guide creation and update.
router.post("/", authMiddleware(["admin"]), upload.array("images"), addGuide);
router.get("/", getGuides);
router.get("/:id", getGuideById);
router.put("/:id", authMiddleware(["admin"]), upload.array("images"), updateGuide);
router.delete("/:id", authMiddleware(["admin"]), deleteGuide);

// Guide Review & Rating Routes
router.post("/:id/reviews", optionalAuthMiddleware, addReview);
router.get("/:id/reviews", getReviews);

module.exports = router;
