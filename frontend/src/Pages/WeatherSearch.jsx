import React, { useState } from "react";
import { getLocationSuggestions, getWeather } from "../api/weatherApi";
import { toast } from "react-hot-toast";
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm } from "react-icons/wi";
import { FaSearch, FaLocationArrow, FaChevronDown } from "react-icons/fa";

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

  const getWeatherIcon = (description = "", size = "text-2xl") => {
    const desc = (description || "").toLowerCase();
    if (desc.includes('sunny') || desc.includes('clear')) return <WiDaySunny className={`text-amber-500 ${size}`} />;
    if (desc.includes('rain')) return <WiRain className={`text-blue-500 ${size}`} />;
    if (desc.includes('cloud')) return <WiCloudy className={`text-gray-500 ${size}`} />;
    if (desc.includes('snow')) return <WiSnow className={`text-blue-300 ${size}`} />;
    if (desc.includes('storm')) return <WiThunderstorm className={`text-purple-600 ${size}`} />;
    return <WiDaySunny className={`text-amber-500 ${size}`} />;
  };

  const fetchSuggestions = async (value) => {
    if (value.length < 2) return setSuggestions([]);
    try {
      const data = await getLocationSuggestions(value);
      setSuggestions(data || []);
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message || "Failed to load suggestions");
    }
  };

  const debouncedFetch = debounce(fetchSuggestions, 600);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    debouncedFetch(value);
  };

  const handleSuggestionClick = async (location) => {
    try {
      setLoading(true);
      const city = location.split(",").pop().trim();
      const weatherData = await getWeather(city);

      // Validate and normalize API response
      const normalizedData = {
        location: weatherData?.name || city,
        current: {
          temp: weatherData?.main?.temp ? `${Math.round(weatherData.main.temp)}°C` : "N/A",
          condition: weatherData?.weather?.[0]?.main || "Unknown",
          humidity: weatherData?.main?.humidity ? `${weatherData.main.humidity}%` : "N/A",
          wind_speed: weatherData?.wind?.speed ? `${weatherData.wind.speed} km/h` : "N/A"
        },
        forecast: weatherData?.forecast || []
      };

      setForecast(normalizedData);
      setSuggestions([]);
      setInput(location);
      toast.success("Weather fetched successfully!");
    } catch (error) {
      console.error(error.message);
      toast.error("Failed to fetch weather data");
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-amber-50 to-amber-100 text-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-center py-24 px-4 bg-gradient-to-r from-amber-400 to-orange-500">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md">
            Weather Explorer
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto mb-8">
            Get accurate weather forecasts for any location worldwide
          </p>
          <div className="animate-bounce mt-8">
            <FaChevronDown className="text-white text-3xl mx-auto" />
          </div>
        </div>
      </section>

      {/* Weather Search Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Check Weather Conditions
            </h2>
            <p className="text-lg text-amber-700 max-w-2xl mx-auto">
              Search for any city to get current weather and forecasts
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative mb-8">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600" />
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Search for a city..."
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm bg-white"
                aria-label="Search for weather location"
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 hover:text-amber-800 transition-colors"
                onClick={() => toast("Location feature coming soon!")}
                aria-label="Use current location"
              >
                <FaLocationArrow />
              </button>
            </div>

            {suggestions.length > 0 && (
              <ul className="mt-2 bg-white rounded-lg shadow-lg border border-amber-200 overflow-hidden">
                {suggestions.map((s, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(s.title)}
                    className="px-4 py-3 hover:bg-amber-50 cursor-pointer border-b border-amber-100 last:border-b-0 transition-colors flex items-center"
                  >
                    <FaSearch className="text-amber-400 mr-2" />
                    <span className="text-amber-800">{s.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {loading && (
            <div className="flex justify-center my-12">
              <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {forecast?.current && !loading && (
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mt-8 border border-amber-200">
              <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                  <div className="mb-4 md:mb-0">
                    <h2 className="text-3xl font-bold text-amber-800">{forecast.location}</h2>
                    <p className="text-amber-700">
                      {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-6xl">
                    {getWeatherIcon(forecast.current.condition, "text-6xl")}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 bg-amber-50 p-5 rounded-lg border border-amber-100">
                  <div className="text-center">
                    <p className="text-sm text-amber-700 mb-1">Temperature</p>
                    <p className="text-2xl font-bold text-amber-900">{forecast.current.temp}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-amber-700 mb-1">Humidity</p>
                    <p className="text-2xl font-bold text-amber-900">{forecast.current.humidity}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-amber-700 mb-1">Wind Speed</p>
                    <p className="text-2xl font-bold text-amber-900">{forecast.current.wind_speed}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-amber-700 mb-1">Conditions</p>
                    <p className="text-xl font-bold text-amber-900 capitalize">{forecast.current.condition.toLowerCase()}</p>
                  </div>
                </div>

                {forecast.forecast?.length > 0 && (
                  <>
                    <h3 className="text-xl font-semibold text-amber-800 mb-6">5-Day Forecast</h3>
                    <div className="space-y-4">
                      {forecast.forecast.map((day, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row items-center justify-between p-4 hover:bg-amber-50 rounded-lg transition-colors border border-amber-100"
                        >
                          <div className="w-full sm:w-32 font-medium text-amber-900 mb-2 sm:mb-0">
                            {day.date}
                          </div>
                          <div className="flex items-center flex-1">
                            <span className="mr-4 text-3xl">
                              {getWeatherIcon(day.description)}
                            </span>
                            <span className="text-lg text-amber-800 capitalize">
                              {day.description}
                            </span>
                          </div>
                          <div className="w-full sm:w-20 text-right text-xl font-bold text-amber-900 mt-2 sm:mt-0">
                            {day.temperature}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default WeatherSearch;
