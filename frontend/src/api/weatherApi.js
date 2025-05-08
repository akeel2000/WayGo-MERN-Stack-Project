import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/weather';

export const getLocationSuggestions = async (input) => {
  const response = await axios.get(`${API_BASE_URL}/autocomplete`, {
    params: { input },
  });
  return response.data.suggestions;
};

export const getWeather = async (location) => {
  const response = await axios.get(`${API_BASE_URL}`, {
    params: { location },
  });
  return response.data;
};
