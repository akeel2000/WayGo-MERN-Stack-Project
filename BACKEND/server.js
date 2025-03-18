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

// Import Routes
const profileRoutes = require("./routes/Akeel/profileRoutes"); 
const weatherRoutes = require("./routes/Akeel/weatherRoutes"); 
const authRoutes = require("./routes/Akeel/authRoutes"); 
const guideRoutes = require("./routes/Akeel/guideRoutes"); 

// Use Routes
app.use("/api/auth", authRoutes); 
app.use("/api/guides", guideRoutes); 
app.use("/api/profile", profileRoutes); 
app.use("/api/weather", weatherRoutes);  // ✅ Ensuring the correct path for weather API

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));




























