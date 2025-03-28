const Card = require('../../models/shajeeh/card');


// CREATE
exports.createCard = async (req, res) => {
  try {
    const { cardHolderName, cardNumber, expiryDate, cvv } = req.body;
    const newCard = new Card({
      userId: req.user.id,
      cardHolderName,
      cardNumber,
      expiryDate,
      cvv
    });
    await newCard.save();
    res.status(201).json({ message: "Card added", card: newCard });
  } catch (err) {
    res.status(500).json({ message: "Error adding card", error: err.message });
  }
};

// READ: Get cards of the logged-in user
exports.getMyCards = async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.user.id });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: "Error fetching cards", error: err.message });
  }
};

// READ: Admin get all cards
exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find().populate('userId');
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all cards", error: err.message });
  }
};

// UPDATE
exports.updateCard = async (req, res) => {
  try {
    const card = await Card.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json({ message: "Card updated", card });
  } catch (err) {
    res.status(500).json({ message: "Error updating card", error: err.message });
  }
};

// DELETE
exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json({ message: "Card deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting card", error: err.message });
  }
};
