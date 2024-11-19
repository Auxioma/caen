import axios from 'axios';

// Create an Axios instance with pre-configured settings
const axiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/forecast', // Base URL for weather API
  timeout: 5000, // Request timeout set to 5 seconds
  params: {
    appid: process.env.REACT_APP_WEATHER_API_KEY || '', // API key for authentication
    units: 'metric', // Use metric units for temperature (e.g., Celsius)
    lang: 'fr', // Language for weather descriptions (French)
  },
});

/**
 * Fetch weather forecast by geographical coordinates.
 *
 * @param {number} lat - Latitude of the location.
 * @param {number} lon - Longitude of the location.
 * @returns {Promise<Object>} - A promise that resolves to the weather forecast data.
 */
export const fetchWeatherByCoords = (lat, lon) =>
  axiosInstance
    .get('', { params: { lat, lon } }) // Pass latitude and longitude as query parameters
    .then((res) => res.data); // Return the response data

/**
 * Fetch weather forecast by city name.
 *
 * @param {string} city - Name of the city.
 * @returns {Promise<Object>} - A promise that resolves to the weather forecast data.
 */
export const fetchWeatherForecast = (city) =>
  axiosInstance
    .get('', { params: { q: city.trim() } }) // Pass city name as a query parameter
    .then((res) => res.data); // Return the response data
