require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/Akeel/authRoutes");
const adminRoutes = require("./routes/Akeel/adminRoutes");
const userRoutes = require("./routes/Akeel/userRoutes");
const guideRoutes = require("./routes/Akeel/guideRoutes");
const userManagementRoutes = require("./routes/Akeel/userManagementRoutes");
const hotelRoutes = require("./routes/risi/hotelRoute"); // Updated hotel route path
const rentalVehicleRoutes = require("./routes/Akeel/rentalVehicleRoutes");

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/guides", guideRoutes);
app.use("/api/admin/users", userManagementRoutes);
app.use("/api/hotels", hotelRoutes); // Ensure hotels route is correctly placed
app.use("/api/rentalVehicles", rentalVehicleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
