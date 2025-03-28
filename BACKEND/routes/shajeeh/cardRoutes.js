const express = require('express');
const router = express.Router();
const {
  createCard,
  getMyCards,
  getAllCards,
  updateCard,
  deleteCard
} = require('../../controllers/shajeeh/cardController');

// ✅ FIXED THIS LINE:
const Card = require('../../models/shajeeh/card');

const auth = require('../../middleware/authMiddleware');

// ------------------------
// USER ROUTES
// ------------------------

router.post('/', auth(["user", "admin"]), createCard);
router.get('/', auth(["user", "admin"]), getMyCards);
router.put('/:id', auth(["user", "admin"]), updateCard);
router.delete('/:id', auth(["user", "admin"]), deleteCard);

// ------------------------
// ADMIN ROUTES
// ------------------------

router.get('/admin/all', auth(["admin"]), getAllCards);

router.post('/admin/:userId', auth(["admin"]), async (req, res) => {
  try {
    const { cardHolderName, cardNumber, expiryDate, cvv } = req.body;

    const newCard = new Card({
      userId: req.params.userId,
      cardHolderName,
      cardNumber,
      expiryDate,
      cvv,
    });

    await newCard.save();
    res.status(201).json({ message: "Card created by admin", card: newCard });
  } catch (err) {
    res.status(500).json({ message: "Error creating card", error: err.message });
  }
});

module.exports = router;
