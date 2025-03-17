const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");

const router = express.Router();

// Protected Profile Route (Only for Logged-in Users)
router.get("/profile", authMiddleware(), (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

module.exports = router;
