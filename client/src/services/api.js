import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const getProducts = async () => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  return response.data;
};

export const getProductStock = async (productSlug) => {
  const response = await axios.get(`${API_BASE_URL}/products/${productSlug}/stock`);
  return response.data;
}; 