/**
 * Retrieves the current geographical position of the user.
 * 
 * @returns {Promise<Object>} - A promise that resolves to an object containing latitude and longitude.
 *                              Example: { latitude: 48.8566, longitude: 2.3522 }
 *                              The promise rejects with a GeolocationPositionError if the operation fails.
 */
export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    // Use the Geolocation API to get the user's current position
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position.coords), // On success, resolve with the coordinates
      (error) => reject(error) // On failure, reject with the error
    );
  });
};
