import React from 'react';

/**
 * SearchBar component for entering a city name and triggering a search action.
 * 
 * @param {string} city - The current value of the city input.
 * @param {Function} setCity - Function to update the city input value.
 * @param {Function} onSearch - Function to trigger the search action.
 */
const SearchBar = ({ city, setCity, onSearch }) => {
  return (
    <div className="search">
      {/* Input field for city name */}
      <input
        type="text"
        placeholder="Enter city name" // Placeholder text in French: "Entrez le nom de la ville"
        value={city} // Controlled component tied to `city` state
        onChange={(e) => setCity(e.target.value || '')} // Update `city` state on input change
      />
      
      {/* Button to initiate the search */}
      <button onClick={onSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
