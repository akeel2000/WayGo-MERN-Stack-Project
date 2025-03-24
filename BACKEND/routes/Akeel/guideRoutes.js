const express = require("express");
const {
  addGuide,
  getGuides,
  getGuideById,
  updateGuide,
  deleteGuide,
  addReview,
  getReviews
} = require("../../controllers/Akeel/guideController");
const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

// Guide Management Routes
router.post("/", authMiddleware(["admin"]), addGuide);
router.get("/", authMiddleware(), getGuides);
router.get("/:id", authMiddleware(), getGuideById);
router.put("/:id", authMiddleware(["admin"]), updateGuide);
router.delete("/:id", authMiddleware(["admin"]), deleteGuide);

// Guide Review & Rating Routes
router.post("/:id/reviews", authMiddleware(["user", "admin"]), addReview);
router.get("/:id/reviews", authMiddleware(), getReviews);

module.exports = router;
