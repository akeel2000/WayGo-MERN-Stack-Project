const mongoose = require("mongoose");

// Schema for storing hotel images
const ImageSchema = new mongoose.Schema({
  url: { type: String },
  contentType: { type: String },
});

// Schema for hotel reviews
const ReviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Optional guest user
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

// Hotel schema
const HotelSchema = new mongoose.Schema(
  {
    images: [ImageSchema], // Array of images
    name: { type: String, required: true }, // Hotel name
    description: { type: String, required: true }, // About the hotel
    location: { type: String, required: true }, // Hotel location
    availableRooms: { type: Number, required: true }, // Number of available rooms
    rating: { type: Number, default: 0 }, // Average rating
    reviews: [ReviewSchema], // Array of reviews
    rentPerNight: { type: Number, required: true }, // Rent per night
    facilities: { type: [String], default: [] }, // Optional: Facilities like Wifi, Pool, Parking
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", HotelSchema);
