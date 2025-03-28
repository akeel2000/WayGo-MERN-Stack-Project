const Hotel = require("../../models/risi/hotel"); // Adjust path accordingly
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// Helper: Delete an image file from disk
const deleteImageFile = (imageUrl) => {
  const filePath = path.join(__dirname, "../..", imageUrl);
  fs.unlink(filePath, (err) => {
    if (err) console.error(`Failed to delete file: ${filePath}`, err);
    else console.log(`Deleted file: ${filePath}`);
  });
};

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Add new hotel (Admin only)
exports.addHotel = async (req, res) => {
  try {
    const { name, description, location, availableRooms, rentPerNight, facilities } = req.body;

    if (!name || !description || !location || !availableRooms || !rentPerNight) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const facilitiesArray =
      typeof facilities === "string"
        ? facilities.split(",").map((item) => item.trim())
        : facilities;

    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => ({
        url: `/uploads/${file.filename}`,
        contentType: file.mimetype,
      }));
    }

    const hotel = await Hotel.create({
      name,
      description,
      location,
      availableRooms: Number(availableRooms),
      rentPerNight: Number(rentPerNight),
      facilities: facilitiesArray,
      images,
    });

    res.status(201).json({ message: "Hotel added successfully", hotel });
  } catch (error) {
    res.status(500).json({ message: "Failed to add hotel", error: error.message });
  }
};

// Get all hotels
exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch hotels", error: error.message });
  }
};

// Get single hotel
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update hotel
exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    const oldImages = hotel.images || [];

    hotel.name = req.body.name || hotel.name;
    hotel.description = req.body.description || hotel.description;
    hotel.location = req.body.location || hotel.location;
    hotel.availableRooms = req.body.availableRooms
      ? Number(req.body.availableRooms)
      : hotel.availableRooms;
    hotel.rentPerNight = req.body.rentPerNight
      ? Number(req.body.rentPerNight)
      : hotel.rentPerNight;

    hotel.facilities = req.body.facilities
      ? req.body.facilities.split(",").map((f) => f.trim())
      : hotel.facilities;

    let newImages = [];
    if (req.files && req.files.length > 0) {
      oldImages.forEach((img) => deleteImageFile(img.url));
      newImages = req.files.map((file) => ({
        url: `/uploads/${file.filename}`,
        contentType: file.mimetype,
      }));
    } else {
      newImages = oldImages;
    }

    hotel.images = newImages;

    await hotel.save();
    res.json({ message: "Hotel updated successfully", hotel });
  } catch (error) {
    res.status(500).json({ message: "Failed to update hotel", error: error.message });
  }
};

// Delete hotel
exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    if (hotel.images && hotel.images.length > 0) {
      hotel.images.forEach((img) => deleteImageFile(img.url));
    }

    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete hotel", error: error.message });
  }
};

// Add review to hotel
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    const review = {
      user: req.user ? req.user.id : null,
      name: req.user ? req.user.name : "Guest",
      rating: Number(rating),
      comment,
    };

    hotel.reviews.push(review);

    hotel.rating =
      hotel.reviews.reduce((acc, r) => r.rating + acc, 0) / hotel.reviews.length;

    await hotel.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error: error.message });
  }
};

// Get reviews of hotel
exports.getReviews = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id).select("reviews rating");
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json(hotel.reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
  }
};

// Middleware to upload images
exports.uploadImages = upload.array("images", 5); // up to 5 images
