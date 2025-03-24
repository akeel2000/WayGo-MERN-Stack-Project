// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");

// Only an admin can access
router.get("/secret-stats", authMiddleware(["admin"]), (req, res) => {
  return res.json({ secret: "Top secret admin data" });
});

// ...
module.exports = router;
