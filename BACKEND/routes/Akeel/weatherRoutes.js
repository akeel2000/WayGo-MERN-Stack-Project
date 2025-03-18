const express = require("express");
const { getWeather, getLocationSuggestions } = require("../../controllers/Akeel/weatherController");

const router = express.Router();

// ✅ Route for autocomplete location suggestions
// router.get("/autocomplete", getLocationSuggestions);

// ✅ Route for fetching 7-day weather forecast
router.get("/", getWeather);

module.exports = router;
