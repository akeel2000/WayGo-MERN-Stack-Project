const express = require("express");
const {
  addHotel,
  getHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} = require("../../controllers/risi/hotelController");  // Fix path to the controller

const router = express.Router();

// Define routes
router.post("/", addHotel); // Add a new hotel
router.get("/", getHotels); // Get all hotels
router.get("/:id", getHotelById); // Get a hotel by ID
router.put("/:id", updateHotel); // Update a hotel
router.delete("/:id", deleteHotel); // Delete a hotel

module.exports = router;
