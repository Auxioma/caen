import React, { useState } from 'react';
import { useWeather } from './hooks/useWeather'; // Custom hook for fetching weather data
import { useExchangeRates } from './hooks/useExchangeRates'; // Custom hook for fetching exchange rates
import ExchangeRates from './components/ExchangeRates'; // Component to display exchange rates
import ForecastList from './components/ForecastList'; // Component to display weather forecasts
import SearchBar from './components/SearchBar'; // Component for input and search functionality
import './App.css'; // App-level styles

const App = () => {
  const [city, setCity] = useState(''); // State to store the city entered by the user
  const {
    forecastData, // Weather forecast data
    geoError,     // Error related to geolocation services
    error: weatherError, // Error related to fetching weather data
    loading,      // Loading state for weather data fetching
    handleFetchWeather // Function to trigger weather data fetch
  } = useWeather(city);

  const { 
    exchangeRates, // Exchange rate data
    error: exchangeError // Error related to fetching exchange rates
  } = useExchangeRates();

  return (
    <div className="app">
      {/* Application title */}
      <h1>Weather Forecast and Exchange Rates</h1>

      {/* Search bar for entering and searching a city */}
      <SearchBar city={city} setCity={setCity} onSearch={handleFetchWeather} />

      {/* Display a loading message while fetching data */}
      {loading && <p>Loading...</p>}

      {/* Display errors if any exist */}
      {(weatherError || geoError || exchangeError) && (
        <p className="error">{weatherError || geoError || exchangeError}</p>
      )}

      {/* Display exchange rates */}
      <ExchangeRates rates={exchangeRates} />

      {/* Display weather forecast list */}
      <ForecastList forecastData={forecastData} />
    </div>
  );
};

export default App;
