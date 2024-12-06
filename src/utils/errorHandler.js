import { logger } from '../server/utils/logger';

/**
 * Centralized error handling utility
 * Handles different types of errors and provides appropriate responses
 */
export const ErrorHandler = {
  /**
   * Handle API errors
   * @param {Error} error - The error object
   * @param {string} context - Context where the error occurred
   * @returns {Object} - Formatted error response
   */
  handleApiError: (error, context) => {
    logger.error(`API Error in ${context}:`, error);

    if (error.name === 'NetworkError') {
      return {
        status: 'error',
        code: 'NETWORK_ERROR',
        message: 'Unable to connect to the server. Please check your internet connection.'
      };
    }

    if (error.response?.status === 404) {
      return {
        status: 'error',
        code: 'NOT_FOUND',
        message: 'The requested resource was not found.'
      };
    }

    return {
      status: 'error',
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred. Please try again later.'
    };
  },

  /**
   * Handle database errors
   * @param {Error} error - The error object
   * @returns {Object} - Formatted error response
   */
  handleDbError: (error) => {
    logger.error('Database Error:', error);

    if (error.code === 11000) {
      return {
        status: 'error',
        code: 'DUPLICATE_ENTRY',
        message: 'A record with this information already exists.'
      };
    }

    return {
      status: 'error',
      code: 'DB_ERROR',
      message: 'A database error occurred. Please try again later.'
    };
  }
}; 