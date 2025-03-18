const axios = require("axios");

// /** ✅ Get Location Autocomplete Suggestions */
// exports.getLocationSuggestions = async (req, res) => {
//   try {
//     const { input } = req.query;
//     if (!input) return res.status(400).json({ message: "Input is required" });

//     const apiKey = process.env.HERE_MAPS_API_KEY;
//     const hereApiUrl = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${input}&apiKey=${apiKey}`;

//     const response = await axios.get(hereApiUrl);
//     console.log("HERE API Response:", response.data);

//     const suggestions = response.data.items.map((place) => ({
//       title: place.title, 
//       location: place.address.city || place.address.label
//     }));

//     res.json({ suggestions });
//   } catch (error) {
//     console.error("HERE Maps API Error:", error.message);
//     res.status(500).json({ message: "Error fetching location suggestions", error: error.message });
//   }
// };

/** ✅ Get 7-Day Weather Forecast */
exports.getWeather = async (req, res) => {
  try {
    const { location } = req.query;
    if (!location) return res.status(400).json({ message: "Location is required" });

    const apiKey = process.env.WEATHER_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&cnt=7&appid=${apiKey}`;

    const response = await axios.get(weatherUrl);
    const weatherData = response.data;

    const forecast = weatherData.list.slice(0, 7).map((day) => ({
      date: new Date(day.dt * 1000).toLocaleDateString(),
      temperature: `${day.main.temp}°C`,
      description: day.weather[0].description,
    }));

    res.json({ location: weatherData.city.name, forecast });
  } catch (error) {
    console.error("Weather API Error:", error.message);
    res.status(500).json({ message: "Error fetching weather data", error: error.message });
  }
};
