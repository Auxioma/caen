import React from 'react';

/**
 * Component to display currency exchange rates.
 * 
 * @param {Object} rates - An object containing exchange rates for different currencies.
 * @returns {JSX.Element|null} - A section displaying exchange rates or null if no rates are available.
 */
const ExchangeRates = ({ rates }) => {
  if (Object.keys(rates).length === 0) return null; // Return nothing if rates object is empty

  return (
    <div className="exchange-rates">
      {/* Display exchange rates */}
      <h2>Exchange Rates</h2>
      <p>1 EUR = {rates.USD} USD</p>
      <p>1 EUR = {rates.JPY} JPY</p>
      <p>1 EUR = {rates.RUB} RUB</p>
    </div>
  );
};

export default ExchangeRates;
