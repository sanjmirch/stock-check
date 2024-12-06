const API_BASE_URL = 'http://localhost:3000/api';

async function handleResponse(response) {
    if (!response.ok) {
        const error = await response.json().catch(() => ({
            error: 'An unknown error occurred'
        }));
        throw new Error(error.error || 'Failed to fetch data');
    }
    return response.json();
}

export async function fetchAllProducts() {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        return handleResponse(response);
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export async function searchProducts(query) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/search?query=${encodeURIComponent(query)}`);
        return handleResponse(response);
    } catch (error) {
        console.error('Error searching products:', error);
        throw error;
    }
}

export async function getProductById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        return handleResponse(response);
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
}

export async function loadProducts() {
    try {
        // Fetch the CSV file from your local directory
        const response = await fetch('/data/products.csv');
        
        if (!response.ok) {
            throw new Error(`Failed to load CSV file: ${response.status}`);
        }
        
        const csvText = await response.text();
        return parseCSV(csvText);
    } catch (error) {
        console.error('Error loading products:', error);
        throw error;
    }
}

function parseCSV(csvText) {
    // Split the CSV text into lines and remove empty lines
    const lines = csvText.split('\n').filter(line => line.trim());
    
    // First line contains headers
    const headers = lines[0].split(',').map(header => header.trim());
    
    // Convert remaining lines to product objects
    const products = lines.slice(1).map(line => {
        const values = line.split(',').map(value => value.trim());
        const product = {};
        
        headers.forEach((header, index) => {
            product[header] = values[index];
        });
        
        return {
            name: product.name,
            stockLevel: parseInt(product.stockLevel) || 0,
            lastUpdated: product.lastUpdated || new Date().toISOString(),
            category: product.category || 'Uncategorized'
        };
    });
    
    return products;
}