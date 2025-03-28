const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      type: { type: String, enum: ['car', 'hotel', 'guide'], required: true },
      itemId: String,
      name: String,
      rentPerDay: Number,
      quantity: Number,
      days: Number
    }
  ],
  total: Number,
  paymentStatus: { type: String, enum: ['No', 'Yes'], default: 'No' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', cartSchema);
