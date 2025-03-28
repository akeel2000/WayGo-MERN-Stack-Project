const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  addHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
  addReview,
  getReviews,
  uploadImages,
} = require("../../controllers/risi/hotelController");

const authMiddleware = require("../../middleware/authMiddleware");
const optionalAuthMiddleware = require("../../middleware/optionalAuthMiddleware");

const router = express.Router();

// Route: Add new hotel (Admin only)
router.post("/", authMiddleware(["admin"]), uploadImages, addHotel);

// Route: Get all hotels
router.get("/", getHotels);

// Route: Get single hotel by ID
router.get("/:id", getHotelById);

// Route: Update hotel (Admin only)
router.put("/:id", authMiddleware(["admin"]), uploadImages, updateHotel);

// Route: Delete hotel (Admin only)
router.delete("/:id", authMiddleware(["admin"]), deleteHotel);

// Route: Add review (User/Guest)
router.post("/:id/reviews", optionalAuthMiddleware, addReview);

// Route: Get reviews for a hotel
router.get("/:id/reviews", getReviews);

module.exports = router;
