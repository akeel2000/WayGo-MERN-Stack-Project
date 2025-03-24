// middleware/optionalAuthMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/Akeel/User");

const optionalAuthMiddleware = async (req, res, next) => {
  const token = req.cookies?.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user && user.token === token) {
        // Attach full user data, including name
        req.user = {
          id: user._id,
          role: user.role,
          name: user.name
        };
      } else {
        req.user = null;
      }
    } catch (error) {
      req.user = null;
    }
  } else {
    req.user = null;
  }
  next();
};

module.exports = optionalAuthMiddleware;
