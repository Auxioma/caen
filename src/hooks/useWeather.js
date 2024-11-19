import { useState, useEffect } from 'react';
import { fetchWeatherByCoords, fetchWeatherForecast } from '../services/weatherService'; // Import weather service functions
import { getCurrentPosition } from '../services/geoService'; // Import geolocation service

/**
 * Custom hook to manage weather-related data fetching and state.
 * 
 * @param {string} city - Name of the city for which to fetch the weather forecast.
 * @returns {Object} - Contains forecast data, errors, loading state, and a function to fetch weather data.
 */
export const useWeather = (city) => {
  const [forecastData, setForecastData] = useState(null); // Stores weather forecast data
  const [geoError, setGeoError] = useState(''); // Stores geolocation-related error
  const [error, setError] = useState(''); // Stores general errors related to fetching weather data
  const [loading, setLoading] = useState(false); // Indicates if a data fetch is in progress

  // Effect to fetch weather data based on the user's current location on initial render
  useEffect(() => {
    const fetchWeatherWithGeo = async () => {
      try {
        const { latitude, longitude } = await getCurrentPosition(); // Get user's location
        const data = await fetchWeatherByCoords(latitude, longitude); // Fetch weather data for the location
        setForecastData(data); // Update the forecast data state
      } catch (err) {
        setGeoError(err.message); // Set geolocation error message
      }
    };

    fetchWeatherWithGeo();
  }, []);

  /**
   * Fetches weather data for the specified city.
   * 
   * @returns {void}
   */
  const handleFetchWeather = async () => {
    if (!city.trim()) { // Validate city input
      setError('Please enter a valid city name.'); // Set validation error
      return;
    }

    setLoading(true); // Set loading state
    setError(''); // Clear any previous error messages
    setForecastData(null); // Clear previous forecast data

    try {
      const data = await fetchWeatherForecast(city); // Fetch weather data for the city
      setForecastData(data); // Update the forecast data state
    } catch (err) {
      // Set error message from API response or default message
      setError(err.response?.data?.message || 'Error fetching weather forecast.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Return all relevant state and functions
  return { 
    forecastData, 
    geoError, 
    error, 
    loading, 
    handleFetchWeather 
  };
};
