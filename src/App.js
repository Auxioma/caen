import React, { useState, useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import { useExchangeRates } from './hooks/useExchangeRates';
import ExchangeRates from './components/ExchangeRates';
import ForecastList from './components/ForecastList';
import SearchBar from './components/SearchBar';
import './App.css';

const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notifications enabled');
    } else {
      console.log('Notifications denied or ignored');
    }
  } else {
    console.log('Notifications API not supported');
  }
};

const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
    try {
      await navigator.serviceWorker.register('/serviceWorker.js');
      console.log('Service Worker registered successfully.');
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  } else {
    console.warn('Service Worker is not supported in this environment.');
  }
};


// Fonction pour envoyer une notification
const sendNotificationForCity = async () => {
  const city = localStorage.getItem('lastCity'); // Récupère la ville depuis le localStorage
  if (!city) return;

  const weatherData = localStorage.getItem('lastWeatherData'); // Récupère les données météo depuis le localStorage
  if (weatherData) {
    const data = JSON.parse(weatherData);
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Weather Update', {
        body: `The weather in ${city} is ${data.list[0].main.temp}°C with ${data.list[0].weather[0].description}.`,
        icon: 'weather-icon.png',
      });
    }
  }
};

const App = () => {
  const [city, setCity] = useState('');
  const {
    forecastData,
    geoError,
    error: weatherError,
    loading,
    handleFetchWeather,
  } = useWeather(city);

  const { exchangeRates, error: exchangeError } = useExchangeRates();

  useEffect(() => {
    requestNotificationPermission();
    registerServiceWorker();

    // Initialisation d'un intervalle pour envoyer les notifications
    const interval = setInterval(() => {
      sendNotificationForCity();
    }, 60000); // Toutes les 60 secondes

    return () => clearInterval(interval); // Nettoyage de l'intervalle lors du démontage
  }, []);

  return (
    <div className="app">
      <h1>Weather Forecast and Notifications</h1>
      <SearchBar city={city} setCity={setCity} onSearch={(city) => {
        handleFetchWeather(city);
        localStorage.setItem('lastCity', city); // Sauvegarde la ville dans le localStorage
      }} />
      {loading && <p>Loading...</p>}
      {(weatherError || geoError || exchangeError) && (
        <p className="error">{weatherError || geoError || exchangeError}</p>
      )}
      <ExchangeRates rates={exchangeRates} />
      <ForecastList forecastData={forecastData} />
    </div>
  );
};

export default App;
