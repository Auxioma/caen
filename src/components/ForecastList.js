import React from 'react';
import { formatDate } from '../utils/dateUtils'; // Import the utility function to format dates

/**
 * Component to display a list of weather forecasts.
 * 
 * @param {Object} forecastData - The weather forecast data.
 * @returns {JSX.Element|null} - A list of formatted forecast entries or null if no data is provided.
 */
const ForecastList = ({ forecastData }) => {
  if (!forecastData) return null; // Return nothing if there is no forecast data

  return (
    <div className="forecast-info">
      {/* Display city name */}
      <h2>Forecast for {forecastData.city.name}</h2>
      
      <div className="forecast-list">
        {/* Render a maximum of 5 forecast entries */}
        {forecastData.list.slice(0, 10).map((item, index) => (
          <div key={index} className="forecast-inline">
            {/* Display formatted date */}
            <span>
              <strong>{formatDate(item.dt)}</strong>
            </span>
            {/* Display temperature */}
            <span> | Temp: {item.main.temp}°C</span>
            {/* Display weather description */}
            <span> | {item.weather[0].description}</span>
            {/* Display humidity */}
            <span> | Humidity: {item.main.humidity}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastList;
