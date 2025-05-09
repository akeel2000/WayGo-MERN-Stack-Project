const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// MongoDB Schema
const UserRequestSchema = new mongoose.Schema({
  intent: String,
  location: String,
  date: String,
  persons: Number,
  createdAt: { type: Date, default: Date.now }
});

const UserRequest = mongoose.model("UserRequest", UserRequestSchema);

// POST: Dialogflow webhook
router.post("/dialogflow", async (req, res) => {
  try {
    const intent = req.body.queryResult.intent.displayName;
    const params = req.body.queryResult.parameters;

    if (intent === "TourBooking") {
      const { location, date, persons } = params;

      // Save request to DB
      const newRequest = new UserRequest({ intent, location, date, persons });
      await newRequest.save();

      return res.json({
        fulfillmentText: `✅ Tour booked to ${location} for ${persons} person(s) on ${date}. We’ll contact you soon!`
      });
    }

    // Fallback for other intents
    res.json({ fulfillmentText: "Sorry, I couldn't process your request." });

  } catch (error) {
    console.error("Dialogflow Webhook Error:", error);
    res.json({ fulfillmentText: "⚠️ Something went wrong while processing your request." });
  }
});

module.exports = router;

