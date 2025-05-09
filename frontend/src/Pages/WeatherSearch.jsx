import React, { useState } from "react";
import { getLocationSuggestions, getWeather } from "../api/weatherApi";
import { toast } from "react-hot-toast";

/** Debounce utility */
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const WeatherSearch = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  /** 🔍 Fetch location suggestions (debounced) */
  const fetchSuggestions = async (value) => {
    if (value.length < 2) return setSuggestions([]);
    try {
      const data = await getLocationSuggestions(value);
      setSuggestions(data);
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message || "Failed to load suggestions");
    }
  };

  const debouncedFetch = debounce(fetchSuggestions, 600); // ⏱ 600ms to avoid rate limit

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    debouncedFetch(value);
  };

  /** 🌦️ Fetch weather for selected suggestion */
  const handleSuggestionClick = async (location) => {
    try {
      setLoading(true);
      const city = location.split(",").pop().trim();
      const weatherData = await getWeather(city);
      setForecast(weatherData);
      setSuggestions([]);
      setInput(location);
      toast.success("Weather fetched successfully!");
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-sky-300 to-indigo-400">
      <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-md">🌦️ Weather Explorer</h1>

      <div className="w-full max-w-md">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter a location..."
          className="p-3 border border-gray-300 rounded w-full mb-2 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {suggestions.length > 0 && (
          <ul className="bg-white rounded shadow overflow-hidden mb-4 max-h-60 overflow-y-auto">
            {suggestions.map((s, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(s.title)}
                className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
              >
                {s.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center mt-4">
          <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {forecast && !loading && (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6 w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center mb-4">{forecast.location}</h2>
          <div className="grid grid-cols-1 gap-4">
            {forecast.forecast.map((day, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0">
                <div className="text-gray-700">{day.date}</div>
                <div className="text-sm text-gray-500 italic">{day.description}</div>
                <div className="font-bold text-blue-700">{day.temperature}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherSearch;
