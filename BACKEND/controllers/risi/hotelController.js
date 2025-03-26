const Hotel = require("../../models/risi/hotel");  // Ensure correct path to the model

// Add a new hotel
exports.addHotel = async (req, res) => {
  try {
    const { name, location, description, amenities, price, availability } = req.body;
    if (!name || !location || !price) {
      return res.status(400).json({ message: "Name, location, and price are required" });
    }
    const hotel = await Hotel.create({ name, location, description, amenities, price, availability });
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

// Get a single hotel by ID
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch hotel", error: error.message });
  }
};

// Update hotel details
exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json({ message: "Hotel updated successfully", hotel });
  } catch (error) {
    res.status(500).json({ message: "Failed to update hotel", error: error.message });
  }
};

// Delete a hotel
exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    await Hotel.findByIdAndDelete(req.params.id);
    res.json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete hotel", error: error.message });
  }
};
