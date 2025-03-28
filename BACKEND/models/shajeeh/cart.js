const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema(
  {
    guide: { type: mongoose.Schema.Types.ObjectId, ref: "Guide", required: true },
    rentalDays: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const CartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [CartItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
