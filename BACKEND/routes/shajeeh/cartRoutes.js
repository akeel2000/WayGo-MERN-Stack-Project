const express = require('express');
const router = express.Router();
const Cart = require('../../models/shajeeh/cartModel');

// Save new booking
router.post('/create', async (req, res) => {
  try {
    const { items, total, userId } = req.body;

    const newCart = new Cart({
      userId,
      items,
      total,
      paymentStatus: "No"
    });

    await newCart.save();
    res.status(201).json({ message: 'Booking saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving booking' });
  }
});

// Mark payment as "Yes"
router.patch('/mark-paid/:id', async (req, res) => {
  try {
    await Cart.findByIdAndUpdate(req.params.id, { paymentStatus: "Yes" });
    res.json({ message: 'Marked as paid' });
  } catch (err) {
    res.status(500).json({ message: 'Error marking payment' });
  }
});

// Get all bookings (admin)
router.get('/all', async (req, res) => {
  try {
    const bookings = await Cart.find().populate('userId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
});

// ✅ Export the router (this is required!)
module.exports = router;
