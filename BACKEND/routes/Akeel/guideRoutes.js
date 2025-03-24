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

// Guide Management Routes (Admin for create/update/delete)
router.post("/", authMiddleware(["admin"]), addGuide);
router.get("/", getGuides);           // Public viewing (or you can protect if desired)
router.get("/:id", getGuideById);       // Public viewing
router.put("/:id", authMiddleware(["admin"]), updateGuide);
router.delete("/:id", authMiddleware(["admin"]), deleteGuide);

// Guide Review & Rating Routes
// Protect this route so that only authenticated users can add reviews.
router.post("/:id/reviews", authMiddleware(["user", "admin"]), addReview);
router.get("/:id/reviews", getReviews); // Public viewing of reviews

module.exports = router;
