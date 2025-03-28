const express = require("express");
const {
  addVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  addReview,
  getReviews,
  uploadImages,
} = require("../../controllers/Ifaz/RentalVehicleController");

const authMiddleware = require("../../middleware/authMiddleware");
const optionalAuthMiddleware = require("../../middleware/optionalAuthMiddleware");

const router = express.Router();

// Admin Routes
router.post("/", authMiddleware(["admin"]), uploadImages, addVehicle);
router.put("/:id", authMiddleware(["admin"]), uploadImages, updateVehicle);
router.delete("/:id", authMiddleware(["admin"]), deleteVehicle);

// Public Routes
router.get("/", getVehicles);
router.get("/:id", getVehicleById);
router.post("/:id/reviews", optionalAuthMiddleware, addReview);
router.get("/:id/reviews", getReviews);

module.exports = router;
