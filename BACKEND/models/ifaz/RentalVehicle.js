const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  url: { type: String },
  contentType: { type: String },
});

const ReviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const RentalVehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    dailyRate: { type: Number, required: true },
    available: { type: Boolean, default: true },
    description: { type: String },
    images: [ImageSchema],
    reviews: [ReviewSchema],
    rating: { type: Number, default: 0 }, // average rating
  },
  { timestamps: true }
);

module.exports = mongoose.model("RentalVehicle", RentalVehicleSchema);

