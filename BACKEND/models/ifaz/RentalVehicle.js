const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  url: { type: String },
  contentType: { type: String },
});

const RentalVehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    dailyRate: { type: Number, required: true },
    available: { type: Boolean, default: true },
    description: { type: String },
    images: [ImageSchema], // Array of image objects
  },
  { timestamps: true }
);

module.exports = mongoose.model("RentalVehicle", RentalVehicleSchema);
