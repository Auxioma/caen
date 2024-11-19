import { useState, useEffect } from 'react';
import { fetchExchangeRates } from '../services/exchangeService'; // Import exchange rates service

/**
 * Custom hook to manage fetching and state for currency exchange rates.
 * 
 * @returns {Object} - Contains exchange rates and error state.
 */
export const useExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState({}); // State to store exchange rates
  const [error, setError] = useState(''); // State to store any errors during data fetching

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const rates = await fetchExchangeRates(); // Fetch exchange rates from the service
        setExchangeRates(rates); // Update state with the fetched rates
      } catch {
        setError('Unable to fetch exchange rates.'); // Set error message if fetching fails
      }
    };

    fetchRates(); // Initial fetch on component mount

    // Set up an interval to refresh exchange rates every 10 seconds
    const interval = setInterval(fetchRates, 10000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  // Return exchange rates and error state
  return { exchangeRates, error };
};
