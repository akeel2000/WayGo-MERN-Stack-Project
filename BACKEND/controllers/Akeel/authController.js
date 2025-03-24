// controllers/Akeel/authController.js
const User = require("../../models/Akeel/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register a New User
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User Registered", user });
  } catch (error) {
    res.status(400).json({ error: "Email already exists or invalid data" });
  }
};

// Login & Set HTTP-only Cookie
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2) Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3) Create a JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4) Store token in DB
    user.token = token;
    await user.save();

    // 5) Set HTTP-only cookie instead of returning token
    //    No token in JSON => no localStorage needed
    res.cookie("token", token, {
      httpOnly: true,         // Important: not accessible via JS
      secure: false,          // set to true if you have HTTPS
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
    });

    // Return role (and maybe user info) so frontend knows who logged in
    res.json({
      message: "Login successful",
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Check if user is logged in (for frontend)
exports.isLoggedIn = async (req, res) => {
  // If the user passed authMiddleware successfully, they're logged in
  // We'll return the user's role or any other info you need
  res.json({
    loggedIn: true,
    role: req.user.role,
    userId: req.user.id,
  });
};

// Logout & Clear Cookie
exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Clear token in DB
    user.token = "";
    await user.save();

    // Clear cookie on client
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
