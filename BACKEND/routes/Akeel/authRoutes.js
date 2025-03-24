// routes/Akeel/authRoutes.js
const express = require("express");
const {
  register,
  login,
  logout,
  isLoggedIn,
} = require("../../controllers/Akeel/authController");
const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Check if user is logged in
router.get("/isLoggedIn", authMiddleware(), isLoggedIn);

// Protected route for logout (requires user to be logged in)
router.post("/logout", authMiddleware(), logout);

module.exports = router;


