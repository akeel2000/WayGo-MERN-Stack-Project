const RentalVehicle = require("../../models/ifaz/RentalVehicle");
const fs = require("fs");
const path = require("path");

// Helper: Delete an image file from disk given its relative URL
const deleteImageFile = (imageUrl) => {
  // Remove the starting slash if needed, then build an absolute path
  const filePath = path.join(__dirname, "../../", imageUrl);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Failed to delete file at ${filePath}:`, err);
    } else {
      console.log(`Deleted file at ${filePath}`);
    }
  });
};

// Create a new rental vehicle (Admin Only)
exports.addVehicle = async (req, res) => {
  try {
    const { name, make, model, year, dailyRate, available, description } = req.body;
    
    // Process uploaded images from req.files (if any)
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => ({
        url: `/uploads/${file.filename}`, // relative URL to access the image
        contentType: file.mimetype,
      }));
    }
    
    const vehicle = await RentalVehicle.create({
      name,
      make,
      model,
      year,
      dailyRate,
      available,
      description,
      images,
    });
    
    res.status(201).json({ message: "Rental vehicle added successfully", vehicle });
  } catch (error) {
    res.status(500).json({ message: "Failed to add vehicle", error: error.message });
  }
};

// Get all rental vehicles (list view, excluding images for performance)
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await RentalVehicle.find().select("-images");
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch vehicles", error: error.message });
  }
};

// Get a specific rental vehicle by ID (full details including images)
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
// This version processes kept images and new uploads.
// The frontend should send a JSON-stringified array of image objects to keep in req.body.keptImages.
exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await RentalVehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Rental vehicle not found" });
    
    // Store the old images for comparison
    const oldImages = vehicle.images;
    
    // Update text fields
    vehicle.name = req.body.name || vehicle.name;
    vehicle.make = req.body.make || vehicle.make;
    vehicle.model = req.body.model || vehicle.model;
    vehicle.year = req.body.year || vehicle.year;
    vehicle.dailyRate = req.body.dailyRate || vehicle.dailyRate;
    vehicle.available = req.body.available !== undefined ? req.body.available : vehicle.available;
    vehicle.description = req.body.description || vehicle.description;
    
    // Process kept images (sent as a JSON string in req.body.keptImages)
    let keptImages = [];
    if (req.body.keptImages) {
      try {
        keptImages = JSON.parse(req.body.keptImages);
      } catch (parseError) {
        return res.status(400).json({ message: "Invalid keptImages format" });
      }
    }
    
    // Process new images (if any) from req.files
    let newImages = [];
    if (req.files && req.files.length > 0) {
      newImages = req.files.map((file) => ({
        url: `/uploads/${file.filename}`,
        contentType: file.mimetype,
      }));
    }
    
    // Identify removed images: those present in oldImages but not in keptImages.
    const removedImages = oldImages.filter(oldImg => {
      return !keptImages.some(keptImg => keptImg.url === oldImg.url);
    });
    
    // Delete removed image files from disk
    removedImages.forEach(img => deleteImageFile(img.url));
    
    // Combine kept images with new images
    vehicle.images = [...keptImages, ...newImages];
    
    await vehicle.save();
    res.json({ message: "Rental vehicle updated", vehicle });
  } catch (error) {
    res.status(500).json({ message: "Failed to update vehicle", error: error.message });
  }
};

// Delete a rental vehicle (Admin Only)
// Also remove all image files from the disk
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await RentalVehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Rental vehicle not found" });
    
    // Delete all associated image files from disk
    if (vehicle.images && vehicle.images.length > 0) {
      vehicle.images.forEach(img => deleteImageFile(img.url));
    }
    
    await RentalVehicle.findByIdAndDelete(req.params.id);
    res.json({ message: "Rental vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete vehicle", error: error.message });
  }
};
