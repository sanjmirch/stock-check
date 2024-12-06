import { useState, useEffect } from 'react';
import { useDebugLog } from './useDebugLog';

/**
 * Custom hook for making API calls with built-in loading and error states
 * @param {string} url - The API endpoint to fetch from
 * @param {Object} options - Fetch options including method, headers, etc.
 * @returns {Object} - Contains data, loading state, error state, and refetch function
 */
export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logApi, logError } = useDebugLog();

  const fetchData = async () => {
    try {
      setLoading(true);
      logApi(`Fetching data from: ${url}`, 'info', { options });

      const response = await fetch(url, {
        ...options,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      logApi(`Successfully fetched data from: ${url}`, 'success', { data: result });

    } catch (err) {
      setError(err);
      logError(`Failed to fetch data from: ${url}`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, JSON.stringify(options)]);

  return { data, loading, error, refetch: fetchData };
}; 