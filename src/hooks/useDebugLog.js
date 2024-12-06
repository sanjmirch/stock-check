import { useCallback } from 'react';

export const useDebugLog = () => {
  const logApi = useCallback((message, type = 'log', details = null) => {
    if (window.debugLog) {
      window.debugLog.api(message, type, details);
    }
  }, []);

  const logError = useCallback((message, error = null) => {
    if (window.debugLog) {
      window.debugLog.error(message, error);
    }
  }, []);

  const logDb = useCallback((message, type = 'log', details = null) => {
    if (window.debugLog) {
      window.debugLog.db(message, type, details);
    }
  }, []);

  return { logApi, logError, logDb };
}; 