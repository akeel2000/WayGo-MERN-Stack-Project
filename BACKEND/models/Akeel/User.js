// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    token: { type: String, default: "" } // for storing the user's current JWT
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);