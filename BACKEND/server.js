require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db1");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();


const profileRoutes = require("./routes/Akeel/profileRoutes"); // ✅ Import the profile routes

// Routes
app.use("/api/auth", require("./routes/Akeel/authRoutes")); // Ensure correct path
app.use("/api/guides", require("./routes/Akeel/guideRoutes")); // Ensure correct path
app.use("/api", profileRoutes); // ✅ Add profile routes


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
