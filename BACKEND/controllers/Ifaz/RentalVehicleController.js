// controllers/Akeel/rentalVehicleController.js
const RentalVehicle = require("../../models/ifaz/RentalVehicle");

// Create a new rental vehicle (Admin Only)
exports.addVehicle = async (req, res) => {
  try {
    const { name, make, model, year, dailyRate, available, description, image } = req.body;
    // Create a new vehicle document
    const vehicle = await RentalVehicle.create({
      name,
      make,
      model,
      year,
      dailyRate,
      available,
      description,
      image,
    });
    res.status(201).json({ message: "Rental vehicle added successfully", vehicle });
  } catch (error) {
    res.status(500).json({ message: "Failed to add vehicle", error: error.message });
  }
};

// Get all rental vehicles (Public or Protected as needed)
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await RentalVehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch vehicles", error: error.message });
  }
};

// Get a single rental vehicle by its ID
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await RentalVehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Rental vehicle not found" });
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch vehicle", error: error.message });
  }
};

// Update a rental vehicle (Admin Only)
exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await RentalVehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehicle) return res.status(404).json({ message: "Rental vehicle not found" });
    res.json({ message: "Rental vehicle updated", vehicle });
  } catch (error) {
    res.status(500).json({ message: "Failed to update vehicle", error: error.message });
  }
};

// Delete a rental vehicle (Admin Only)
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await RentalVehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Rental vehicle not found" });
    await RentalVehicle.findByIdAndDelete(req.params.id);
    res.json({ message: "Rental vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete vehicle", error: error.message });
  }
};

