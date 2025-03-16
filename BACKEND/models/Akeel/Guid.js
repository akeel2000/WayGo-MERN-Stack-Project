const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true }, // User's name
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true }
}, { timestamps: true });

const GuideSchema = new mongoose.Schema({
  name: { type: String, required: true },
  about: { type: String, required: true },
  experience: { type: Number, required: true },
  location: { type: String, required: true },
  languages: { type: [String], required: true },
  available: { type: Boolean, default: true },
  rating: { type: Number, default: 0 }, // Average rating
  reviews: [ReviewSchema] // List of reviews
}, { timestamps: true });

module.exports = mongoose.model("Guide", GuideSchema);
