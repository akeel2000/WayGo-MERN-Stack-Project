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

// Routes
app.use("/api/auth", require("./routes/Akeel/authRoutes")); // Ensure correct path
app.use("/api/guides", require("./routes/Akeel/guideRoutes")); // Ensure correct path

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
