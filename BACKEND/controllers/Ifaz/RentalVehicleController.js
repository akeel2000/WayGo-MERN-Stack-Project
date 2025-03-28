const RentalVehicle = require("../../models/ifaz/RentalVehicle");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// Delete image helper
const deleteImageFile = (imageUrl) => {
  const filePath = path.join(__dirname, "../..", imageUrl);
  fs.unlink(filePath, (err) => {
    if (err) console.error(`Error deleting file: ${filePath}`, err);
    else console.log(`Deleted file: ${filePath}`);
  });
};

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });
exports.uploadImages = upload.array("images", 5);

// Add Vehicle
exports.addVehicle = async (req, res) => {
  try {
    const { name, make, model, year, dailyRate, available, description } = req.body;

    const images = req.files?.map((file) => ({
      url: `/uploads/${file.filename}`,
      contentType: file.mimetype,
    })) || [];

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

    res.status(201).json({ message: "Vehicle added", vehicle });
  } catch (error) {
    res.status(500).json({ message: "Add failed", error: error.message });
  }
};

// Get all
exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await RentalVehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed", error: err.message });
  }
};

// Get by ID
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await RentalVehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Not found" });
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

// Update
exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await RentalVehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Not found" });

    const oldImages = vehicle.images || [];
    const keptImages = req.body.keptImages ? JSON.parse(req.body.keptImages) : [];

    const newImages = req.files?.map((file) => ({
      url: `/uploads/${file.filename}`,
      contentType: file.mimetype,
    })) || [];

    const removed = oldImages.filter(
      (img) => !keptImages.some((k) => k.url === img.url)
    );
    removed.forEach((img) => deleteImageFile(img.url));

    Object.assign(vehicle, {
      name: req.body.name || vehicle.name,
      make: req.body.make || vehicle.make,
      model: req.body.model || vehicle.model,
      year: req.body.year || vehicle.year,
      dailyRate: req.body.dailyRate || vehicle.dailyRate,
      available: req.body.available !== undefined ? req.body.available : vehicle.available,
      description: req.body.description || vehicle.description,
      images: [...keptImages, ...newImages],
    });

    await vehicle.save();
    res.json({ message: "Vehicle updated", vehicle });
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// Delete
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await RentalVehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Not found" });

    vehicle.images.forEach((img) => deleteImageFile(img.url));
    await RentalVehicle.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

// Add review
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const vehicle = await RentalVehicle.findById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    const review = {
      user: req.user?.id || null,
      name: req.user?.name || "Guest",
      rating: Number(rating),
      comment,
    };

    vehicle.reviews.push(review);
    vehicle.rating =
      vehicle.reviews.reduce((acc, r) => r.rating + acc, 0) / vehicle.reviews.length;

    await vehicle.save();
    res.status(201).json({ message: "Review added" });
  } catch (err) {
    res.status(500).json({ message: "Review failed", error: err.message });
  }
};

// Get reviews
exports.getReviews = async (req, res) => {
  try {
    const vehicle = await RentalVehicle.findById(req.params.id).select("reviews rating");
    if (!vehicle) return res.status(404).json({ message: "Not found" });
    res.json(vehicle.reviews);
  } catch (err) {
    res.status(500).json({ message: "Fetch reviews failed", error: err.message });
  }
};
