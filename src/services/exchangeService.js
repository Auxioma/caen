import axios from 'axios';

// Create an Axios instance with pre-configured settings
const axiosInstance = axios.create({
  baseURL: 'https://api.freecurrencyapi.com/v1/latest', // Base URL for the currency exchange rates API
  timeout: 5000, // Request timeout set to 5 seconds
  params: {
    apikey: process.env.REACT_APP_FREECURRENCYAPI_KEY || '', // API key for authentication
    base_currency: 'EUR', // Base currency for exchange rates
    currencies: 'USD,JPY,RUB', // Target currencies to fetch rates for
  },
});

/**
 * Fetches the latest exchange rates for specified currencies relative to the base currency.
 *
 * @returns {Promise<Object>} - A promise that resolves to an object containing exchange rates.
 *                              Example: { USD: 1.1, JPY: 150.5, RUB: 90.2 }
 */
export const fetchExchangeRates = () =>
  axiosInstance
    .get() // Make a GET request to the API
    .then((res) => res.data.data); // Return the relevant data from the response
