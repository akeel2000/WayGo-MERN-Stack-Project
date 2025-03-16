const jwt = require("jsonwebtoken");

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
      const token = authHeader.split(" ")[1]; // Extract token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

      req.user = decoded; // Attach user data to request

      // If no specific roles are required, allow all authenticated users
      if (roles.length === 0) {
        return next();
      }

      // Check if user has the required role
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access Denied: Insufficient permissions" });
      }

      next(); // Proceed if authorized
    } catch (error) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = authMiddleware;
