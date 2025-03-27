const express = require("express");
const router = express.Router();
const upload = require("../../middleware/upload");
const {
  addVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} = require("../../controllers/Ifaz/RentalVehicleController");

// Admin route: Create vehicle with up to 5 images
router.post("/", upload.array("images", 5), addVehicle);

// Public route: Get all vehicles (with images)
router.get("/", getVehicles);

// Public route: Get a specific vehicle by ID (with images)
router.get("/:id", getVehicleById);

// Admin route: Update vehicle (with new image uploads)
router.put("/:id", upload.array("images", 5), updateVehicle);

// Admin route: Delete vehicle
router.delete("/:id", deleteVehicle);

module.exports = router;
