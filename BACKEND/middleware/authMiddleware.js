// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/Akeel/User");

const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    // Instead of reading from Authorization header, read from cookie
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
      // 1) Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 2) Check if token in DB matches the one provided
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      if (user.token !== token) {
        return res.status(401).json({ message: "Token is no longer valid" });
      }

      // 3) Attach user data, including the user's name
      req.user = {
        id: user._id,
        role: user.role,
        name: user.name, // <-- add this so you can use req.user.name
      };

      // 4) Role check if needed
      if (roles.length > 0 && !roles.includes(user.role)) {
        return res.status(403).json({ message: "Insufficient permissions" });
      }

      next();
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = authMiddleware;
