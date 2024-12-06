const API_BASE_URL = '/api';

async function fetchWithLogging(url, options = {}) {
  try {
    window.debugLog.api(`Fetching: ${url}`, 'log', { options });
    
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

    const data = await response.json();
    window.debugLog.api(`Success: ${url}`, 'log', { data });
    return data;
  } catch (error) {
    window.debugLog.api(`Failed: ${url}`, 'error', { error: error.message });
    throw error;
  }
}

export const checkServerStatus = async () => {
  return fetchWithLogging(`${API_BASE_URL}/health`);
};

export const getProducts = async () => {
  return fetchWithLogging(`${API_BASE_URL}/products`);
};

export const getProductStock = async (productSlug) => {
  return fetchWithLogging(`${API_BASE_URL}/products/${productSlug}/stock`);
};

export const searchProducts = async (query) => {
  return fetchWithLogging(`${API_BASE_URL}/products/search?query=${encodeURIComponent(query)}`);
}; 