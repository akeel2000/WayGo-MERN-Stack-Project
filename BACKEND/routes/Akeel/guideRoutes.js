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
router.post("/", authMiddleware(["admin"]), addGuide); // ✅ Only Admins can add guides
router.get("/", authMiddleware(), getGuides); // ✅ All authenticated users can view guides
router.get("/:id", authMiddleware(), getGuideById); // ✅ All authenticated users can view single guide
router.put("/:id", authMiddleware(["admin"]), updateGuide); // ✅ Only Admins can update guides
router.delete("/:id", authMiddleware(["admin"]), deleteGuide); // ✅ Only Admins can delete guides

// Guide Review & Rating Routes
router.post("/:id/reviews", authMiddleware(["user", "admin"]), addReview); // ✅ Users & Admins can review guides
router.get("/:id/reviews", authMiddleware(), getReviews); // ✅ All authenticated users can view reviews

module.exports = router;


