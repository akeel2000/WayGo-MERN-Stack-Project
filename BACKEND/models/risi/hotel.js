const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
    amenities: [{ type: String }],
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    ratings: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", HotelSchema)