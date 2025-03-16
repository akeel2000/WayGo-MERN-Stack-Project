const Guide = require("../../models/Akeel/Guid");

// ✅ Add a new guide (Admin Only)
exports.addGuide = async (req, res) => {
  try {
    const { name, about, experience, location, languages } = req.body;

    if (!name || !about || !experience || !location || !languages) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const guide = await Guide.create({ name, about, experience, location, languages });
    res.status(201).json({ message: "Guide added successfully", guide });
  } catch (error) {
    res.status(500).json({ message: "Failed to add guide", error: error.message });
  }
};

// ✅ Get all guides
exports.getGuides = async (req, res) => {
  try {
    const guides = await Guide.find().select("-reviews"); // Exclude reviews to optimize response
    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch guides", error: error.message });
  }
};

// ✅ Get a single guide by ID
exports.getGuideById = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ message: "Guide not found" });
    res.json(guide);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update guide details (Admin Only)
exports.updateGuide = async (req, res) => {
  try {
    const guide = await Guide.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }

    res.json({ message: "Guide updated", guide });
  } catch (error) {
    res.status(500).json({ message: "Failed to update guide", error: error.message });
  }
};

// ✅ Delete a guide (Admin Only)
exports.deleteGuide = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ message: "Guide not found" });

    await Guide.findByIdAndDelete(req.params.id);
    res.json({ message: "Guide deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete guide", error: error.message });
  }
};

// // ✅ Add a Review (Users & Admins)
// exports.addReview = async (req, res) => {
//   try {
//     const { rating, comment } = req.body;
//     const guide = await Guide.findById(req.params.id);

//     if (!guide) return res.status(404).json({ message: "Guide not found" });

//     // Check if user has already reviewed
//     const alreadyReviewed = guide.reviews.find(r => r.user.toString() === req.user.id);
//     if (alreadyReviewed) {
//       return res.status(400).json({ message: "You have already reviewed this guide" });
//     }

//     // Add review
//     const review = {
//       user: req.user.id,
//       name: req.user.name,
//       rating: Number(rating),
//       comment,
//     };

//     guide.reviews.push(review);

//     // Calculate new average rating
//     guide.rating = guide.reviews.reduce((acc, item) => item.rating + acc, 0) / guide.reviews.length;

//     await guide.save();
//     res.status(201).json({ message: "Review added successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to add review", error: error.message });
//   }
// };


exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const guide = await Guide.findById(req.params.id);

    if (!guide) return res.status(404).json({ message: "Guide not found" });

    // Add review (allowing guests)
    const review = {
      user: req.user ? req.user.id : null,  // ✅ Allow guests (no `user` field)
      name: req.user ? req.user.name : "Guest",  // ✅ Set "Guest" name
      rating: Number(rating),
      comment
    };

    guide.reviews.push(review);

    // Calculate new average rating
    guide.rating = guide.reviews.reduce((acc, item) => item.rating + acc, 0) / guide.reviews.length;

    await guide.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error: error.message });
  }
};


// ✅ Get Reviews for a Guide
exports.getReviews = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id).select("reviews rating");

    if (!guide) return res.status(404).json({ message: "Guide not found" });

    res.json(guide.reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
  }
};
