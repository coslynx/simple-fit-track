/**
 * Formats a date into 'YYYY-MM-DD' string format.
 * Handles null, undefined, and invalid date inputs by returning null, and logs an error to console.
 *
 * @param {Date|string} date - The date to format, can be a Date object or a date string.
 * @returns {string|null} - The formatted date string or null if the date is invalid.
 */
const formatDate = (date) => {
    if (date == null) {
        return null;
    }

    let dateObj;
    if (date instanceof Date) {
        dateObj = date;
    } else {
      try {
        dateObj = new Date(date);
      } catch (error) {
         console.error('Invalid date format:', date, error);
         return null;
      }

    }

    if (isNaN(dateObj.getTime())) {
        console.error('Invalid date provided:', date);
        return null;
    }

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};


/**
 * Capitalizes the first letter of a string and converts the rest to lowercase.
 * Handles null, undefined, and non-string inputs by returning an empty string and logs an error to console.
 *
 * @param {string} str - The string to capitalize.
 * @returns {string} - The capitalized string or an empty string if input is invalid.
 */
const capitalizeFirstLetter = (str) => {
    if (str == null) {
        console.error('Invalid input: String is null or undefined.');
        return '';
    }

    if (typeof str !== 'string') {
        console.error('Invalid input: Input is not a string.');
      return '';
    }

    if (str.length === 0) {
        return '';
    }
    try {
       const firstLetter = str.charAt(0).toUpperCase();
       const restOfString = str.slice(1).toLowerCase();
       return `${firstLetter}${restOfString}`;

    } catch (error) {
        console.error('Error during capitalization:', error);
      return '';
    }
};


/**
 * Truncates a string to a specified maximum length, adding "..." if truncated.
 * Handles null or undefined input by returning an empty string, logs an error if max length is invalid.
 *
 * @param {string} text - The string to truncate.
 * @param {number} maxLength - The maximum length of the truncated string.
 * @returns {string} - The truncated string or an empty string if input is invalid.
 */
const truncateText = (text, maxLength) => {
  if (text == null) {
      return '';
  }
  if (typeof text !== 'string') {
      console.error('Invalid input: Input is not a string.');
      return '';
    }

  if (typeof maxLength !== 'number' || isNaN(maxLength) ) {
        console.error('Invalid max length:', maxLength);
        return '';
    }

  if (maxLength < 0) {
    console.error('Invalid max length, it must be a positive number.');
        return '';
  }

  if (maxLength === 0) {
      return '';
  }


  if (text.length <= maxLength) {
        return text;
    }
    try {
      return `${text.slice(0, maxLength)}...`;
    } catch (error) {
        console.error('Error during text truncation:', error);
        return '';
    }

};


export { formatDate, capitalizeFirstLetter, truncateText };