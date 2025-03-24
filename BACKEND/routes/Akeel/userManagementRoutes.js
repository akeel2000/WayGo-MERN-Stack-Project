const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");
const User = require("../../models/Akeel/User");
const bcrypt = require("bcryptjs");

// DEBUG line to confirm this file is actually loaded
console.log("DEBUG: userManagementRoutes.js loaded!");

// GET all users (admin can view all users)
router.get("/", authMiddleware(["admin"]), async (req, res) => {
  console.log("DEBUG: GET / in userManagementRoutes triggered!");
  try {
    const users = await User.find().select("-password -token");
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST create a new user
router.post("/", authMiddleware(["admin"]), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: "Error creating user" });
  }
});

// PUT update a user
router.put("/:id", authMiddleware(["admin"]), async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    );
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: "Error updating user" });
  }
});

// DELETE a user
router.delete("/:id", authMiddleware(["admin"]), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting user" });
  }
});

module.exports = router;
