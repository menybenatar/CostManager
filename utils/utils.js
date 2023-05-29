const utilsNamespace = { };

/**
 * Generate a unique ID based on current timestamp and a random number.
 * @returns {number} Generated ID.
 */
utilsNamespace.generateId = () => {
    const timestamp = Date.now(); // Get current timestamp
    const random = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
    const id = timestamp + random; // Concatenate the timestamp and random number
    return id;
};

module.exports = utilsNamespace;