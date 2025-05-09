const express = require("express");
const { getWeather, getLocationSuggestions } = require("../../controllers/Akeel/weatherController");

const router = express.Router();

router.get("/autocomplete", getLocationSuggestions);
router.get("/", getWeather);

module.exports = router;
