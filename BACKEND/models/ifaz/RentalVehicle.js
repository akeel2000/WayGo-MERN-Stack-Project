// models/Ifaz/RentalVehicle.js
const mongoose = require("mongoose");

const RentalVehicleSchema = new mongoose.Schema(
  {
    // A descriptive name for the vehicle
    name: { type: String, required: true },
    // Manufacturer of the vehicle (e.g., Toyota, Ford)
    make: { type: String, required: true },
    // Model of the vehicle (e.g., Camry, Focus)
    model: { type: String, required: true },
    // Manufacturing year
    year: { type: Number, required: true },
    // Rental rate per day (or hour) in your currency
    dailyRate: { type: Number, required: true },
    // Indicates if the vehicle is available for rental
    available: { type: Boolean, default: true },
    // Optional description of the vehicle
    description: { type: String },
    // URL or file path to an image of the vehicle
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RentalVehicle", RentalVehicleSchema);