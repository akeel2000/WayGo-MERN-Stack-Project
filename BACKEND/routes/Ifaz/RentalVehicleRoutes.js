const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware"); // Ensure this middleware exists
const upload = require("../../middleware/upload");
const {
  addVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} = require("../../controllers/Ifaz/RentalVehicleController");

// Admin-only route: Create a new vehicle with up to 5 images
router.post("/", authMiddleware(["admin"]), upload.array("images", 5), addVehicle);

// Public route: Get list of vehicles (excluding images)
router.get("/", getVehicles);

// Public route: Get full details of a vehicle by ID (includes images)
router.get("/:id", getVehicleById);

// Admin-only route: Update a vehicle (if new images are uploaded, they replace old ones)
router.put("/:id", authMiddleware(["admin"]), upload.array("images", 5), updateVehicle);

// Admin-only route: Delete a vehicle
router.delete("/:id", authMiddleware(["admin"]), deleteVehicle);

module.exports = router;
