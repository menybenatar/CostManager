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

utilsNamespace.validateDate = function validateDate(year, month, day) {
    // Convert the year, month, and day to numbers
    const numericYear = parseInt(year, 10);
    const numericMonth = parseInt(month, 10);
    const numericDay = parseInt(day, 10);

    // Check if the year, month, and day are valid numbers
    if (isNaN(numericYear) || isNaN(numericMonth) || isNaN(numericDay)) {
        return false; // Invalid date format
    }

    // Check if the year is within a valid range
    if (numericYear < 0 || numericYear > 9999) {
        return false; // Invalid year
    }

    // Check if the month is within a valid range
    if (numericMonth < 1 || numericMonth > 12) {
        return false; // Invalid month
    }

    // Check if the day is within a valid range for the given month and year
    const lastDayOfMonth = new Date(numericYear, numericMonth, 0).getDate();
    if (numericDay < 1 || numericDay > lastDayOfMonth) {
        return false; // Invalid day
    }

    // The date is valid
    return true;
}

module.exports = utilsNamespace;