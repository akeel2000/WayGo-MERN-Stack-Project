// routes/Akeel/rentalVehicleRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");
const {
  addVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} = require("../../controllers/Ifaz/RentalVehicleController");

// Create a new rental vehicle (Admin only)
router.post("/", authMiddleware(["admin"]), addVehicle);

// Get all rental vehicles (can be public; remove authMiddleware if not needed)
router.get("/", getVehicles);

// Get a specific rental vehicle by ID (can be public)
router.get("/:id", getVehicleById);

// Update a rental vehicle (Admin only)
router.put("/:id", authMiddleware(["admin"]), updateVehicle);

// Delete a rental vehicle (Admin only)
router.delete("/:id", authMiddleware(["admin"]), deleteVehicle);

module.exports = router;