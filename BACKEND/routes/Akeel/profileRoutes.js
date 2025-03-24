
const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");

// Any authenticated user can access
router.get("/profile", authMiddleware(), (req, res) => {
  return res.json({ message: `Welcome user ${req.user.id}`, role: req.user.role });
});

// ...
module.exports = router;
