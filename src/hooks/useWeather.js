import { useState, useEffect } from 'react';
import { fetchWeatherByCoords, fetchWeatherForecast } from '../services/weatherService'; // Import weather service functions
import { getCurrentPosition } from '../services/geoService'; // Import geolocation service

export const useWeather = (city) => {
  const [forecastData, setForecastData] = useState(null); // Stores weather forecast data
  const [geoError, setGeoError] = useState(''); // Stores geolocation-related error
  const [error, setError] = useState(''); // Stores general errors related to fetching weather data
  const [loading, setLoading] = useState(false); // Indicates if a data fetch is in progress

  useEffect(() => {
    // Charger les données météo enregistrées dans le localStorage au démarrage
    const savedWeatherData = localStorage.getItem('lastWeatherData');
    if (savedWeatherData) {
      setForecastData(JSON.parse(savedWeatherData)); // Charger les données sauvegardées
    }

    // Tenter de récupérer les données météo avec la géolocalisation
    const fetchWeatherWithGeo = async () => {
      try {
        const { latitude, longitude } = await getCurrentPosition(); // Obtenir la position actuelle
        const data = await fetchWeatherByCoords(latitude, longitude); // Récupérer les données météo pour cette position
        setForecastData(data); // Mettre à jour les données météo
        localStorage.setItem('lastWeatherData', JSON.stringify(data)); // Sauvegarder dans le localStorage
      } catch (err) {
        setGeoError(err.message); // Enregistrer les erreurs de géolocalisation
      }
    };

    fetchWeatherWithGeo(); // Exécuter la récupération au démarrage
  }, []);

  const handleFetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a valid city name.'); // Validation de la saisie
      return;
    }

    setLoading(true);
    setError('');
    setForecastData(null);

    try {
      const data = await fetchWeatherForecast(city); // Récupérer les données météo pour la ville
      setForecastData(data); // Mettre à jour les données météo
      localStorage.setItem('lastWeatherData', JSON.stringify(data)); // Sauvegarder les données météo
      localStorage.setItem('lastCity', city); // Sauvegarder le nom de la ville

      // Envoyer une notification si les permissions sont accordées
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Weather Update', {
          body: `The weather in ${city} is ${data.list[0].main.temp}°C with ${data.list[0].weather[0].description}.`,
          icon: 'weather-icon.png', // Ajoutez une icône personnalisée si souhaité
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching weather forecast.');
    } finally {
      setLoading(false);
    }
  };

  return {
    forecastData, // Données météo
    geoError,     // Erreurs liées à la géolocalisation
    error,        // Autres erreurs
    loading,      // État de chargement
    handleFetchWeather, // Fonction pour déclencher une recherche météo
  };
};
