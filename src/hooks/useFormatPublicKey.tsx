/**
 * Custom hook for formatting public keys.
 * @returns {Object} - An object containing the formatPublicKey function.
 */
const useFormatPublicKey = () => {
  /**
   * Function to format a public key by showing only the first and last parts with ellipses in between.
   * @param {string} publicKey - The public key string to be formatted.
   * @returns {string} - The formatted public key.
   */
  function formatPublicKey(publicKey: string) {
    // Check if the public key length is greater than 6 characters
    if (publicKey?.length > 6) {
      // Extract the first 5 characters and the last 3 characters of the public key
      const firstThree = publicKey.slice(0, 5);
      const lastThree = publicKey.slice(-3);
      // Return the formatted public key with ellipses in between
      return `${firstThree}...${lastThree}`;
    } else {
      // Return the public key as is if its length is 6 or fewer characters
      return publicKey;
    }
  }

  // Return the formatPublicKey function
  return { formatPublicKey };
};

export default useFormatPublicKey;
