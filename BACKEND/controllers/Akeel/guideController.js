// controllers/guideController.js
const Guide = require("../../models/Akeel/Guide"); // Adjust path to your Guide model
const fs = require("fs");
const path = require("path");

// Helper: Delete an image file from disk given its relative URL
const deleteImageFile = (imageUrl) => {
  const filePath = path.join(__dirname, "../..", imageUrl);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Failed to delete file at ${filePath}:`, err);
    } else {
      console.log(`Deleted file at ${filePath}`);
    }
  });
};

// Create a new guide (Admin Only) with image(s)
exports.addGuide = async (req, res) => {
  try {
    const { name, about, experience, location, languages, available } = req.body;

    // Check for required fields
    if (!name || !about || !experience || !location || !languages) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Convert experience to Number
    const experienceNum = Number(experience);

    // Convert languages to an array if it's a string
    let languagesArray = languages;
    if (typeof languages === "string") {
      // e.g., "English, Spanish"
      languagesArray = languages.split(",").map((lang) => lang.trim());
    }

    // Process uploaded images from req.files (if any)
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => ({
        url: `/uploads/${file.filename}`, // relative URL
        contentType: file.mimetype,
      }));
    }

    const guide = await Guide.create({
      name,
      about,
      experience: experienceNum,
      location,
      languages: languagesArray,
      available: available === "true" || available === true, // convert string to boolean
      images,
    });

    res.status(201).json({ message: "Guide added successfully", guide });
  } catch (error) {
    res.status(500).json({ message: "Failed to add guide", error: error.message });
  }
};

// Get all guides
exports.getGuides = async (req, res) => {
  try {
    const guides = await Guide.find();
    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch guides", error: error.message });
  }
};

// Get a single guide by ID
exports.getGuideById = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ message: "Guide not found" });
    res.json(guide);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update guide details (Admin Only)
exports.updateGuide = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ message: "Guide not found" });

    // Old images
    const oldImages = guide.images || [];

    // Update text fields
    guide.name = req.body.name || guide.name;
    guide.about = req.body.about || guide.about;
    guide.experience = req.body.experience ? Number(req.body.experience) : guide.experience;
    guide.location = req.body.location || guide.location;
    guide.languages = req.body.languages
      ? req.body.languages.split(",").map((lang) => lang.trim())
      : guide.languages;
    guide.available = req.body.available === "true" || req.body.available === true
      ? true
      : false;

    // If you are implementing "keptImages", you'd parse it here. 
    // Otherwise, we'll assume we replace all old images with new images.

    // Process new images
    let newImages = [];
    if (req.files && req.files.length > 0) {
      // Delete old images from disk if you want to replace them
      oldImages.forEach((img) => deleteImageFile(img.url));

      newImages = req.files.map((file) => ({
        url: `/uploads/${file.filename}`,
        contentType: file.mimetype,
      }));
    } else {
      // If no new images are uploaded, keep the old ones
      newImages = oldImages;
    }

    guide.images = newImages;

    await guide.save();
    res.json({ message: "Guide updated successfully", guide });
  } catch (error) {
    res.status(500).json({ message: "Failed to update guide", error: error.message });
  }
};

// Delete a guide (Admin Only)
exports.deleteGuide = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ message: "Guide not found" });

    // Delete images from disk
    if (guide.images && guide.images.length > 0) {
      guide.images.forEach((img) => deleteImageFile(img.url));
    }

    await Guide.findByIdAndDelete(req.params.id);
    res.json({ message: "Guide deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete guide", error: error.message });
  }
};


// Add a review (Users, Admins, or Guests)
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ message: "Guide not found" });

    const review = {
      user: req.user ? req.user.id : null,
      name: req.user ? req.user.name : "Guest",
      rating: Number(rating),
      comment
    };
    

    guide.reviews.push(review);
    // Calculate new average rating
    guide.rating =
      guide.reviews.reduce((acc, item) => item.rating + acc, 0) / guide.reviews.length;

    await guide.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error: error.message });
  }
};


// Get reviews for a guide
exports.getReviews = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id).select("reviews rating");
    if (!guide) return res.status(404).json({ message: "Guide not found" });
    res.json(guide.reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
  }
};
