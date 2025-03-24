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
const optionalAuthMiddleware = require("../../middleware/optionalAuthMiddleware");

const router = express.Router();

// Guide Management Routes (Admin-only for modifications)
router.post("/", authMiddleware(["admin"]), addGuide);
router.get("/", getGuides);
router.get("/:id", getGuideById);
router.put("/:id", authMiddleware(["admin"]), updateGuide);
router.delete("/:id", authMiddleware(["admin"]), deleteGuide);

// Guide Review & Rating Routes
// Use optional auth middleware so if a token exists, req.user is set,
// but if not, it still allows the review to be added as a guest.
router.post("/:id/reviews", optionalAuthMiddleware, addReview);
router.get("/:id/reviews", getReviews);

module.exports = router;
