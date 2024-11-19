/**
 * Formats a Unix timestamp into a human-readable date string.
 * 
 * @param {number} timestamp - The Unix timestamp (in seconds).
 * @returns {string} - Formatted date string in 'fr-FR' locale.
 */
export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('fr-FR', {
    weekday: 'long',  // Display the full name of the day (e.g., "lundi")
    hour: '2-digit',  // Display the hour in 2-digit format (e.g., "08")
    minute: '2-digit' // Display the minute in 2-digit format (e.g., "30")
  });
};
