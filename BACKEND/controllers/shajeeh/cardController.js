const Cart = require("../models/Cart");
const Guide = require("../models/Guide");

exports.addToCart = async (req, res) => {
  try {
    const { guideId, rentalDays } = req.body;

    const guide = await Guide.findById(guideId);
    if (!guide) return res.status(404).send("Guide not found.");

    const totalPrice = guide.perDayAmount * rentalDays;

    const newCartItem = {
      guide: guide._id,
      rentalDays,
      totalPrice,
    };

    const userCart = await Cart.findOne({ user: req.user.id });

    if (!userCart) {
      const newCart = new Cart({
        user: req.user.id,
        items: [newCartItem],
      });
      await newCart.save();
      return res.status(201).send("Guide added to your cart!");
    } else {
      userCart.items.push(newCartItem);
      await userCart.save();
      return res.status(200).send("Guide added to your cart!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding guide to cart.");
  }
};

exports.viewCart = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ user: req.user.id }).populate(
      "items.guide"
    );
    if (!userCart || userCart.items.length === 0) {
      return res.status(404).send("Your cart is empty.");
    }
    res.json(userCart);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching cart details.");
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const userCart = await Cart.findOne({ user: req.user.id });
    if (!userCart) {
      return res.status(404).send("Cart not found.");
    }

    const itemIndex = userCart.items.findIndex((item) => item.guide.toString() === id);
    if (itemIndex === -1) {
      return res.status(404).send("Item not found in your cart.");
    }

    userCart.items.splice(itemIndex, 1); // Remove item from cart
    await userCart.save();
    res.status(200).send("Item removed from cart.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error removing item from cart.");
  }
};
