const express = require("express");
const CartController = require("../../controllers/CartController");
const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

router.post("/add-to-cart", authMiddleware(["user"]), CartController.addToCart);
router.get("/view-cart", authMiddleware(["user"]), CartController.viewCart);
router.delete("/remove-from-cart/:id", authMiddleware(["user"]), CartController.removeFromCart);

module.exports = router;
