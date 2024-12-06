import { initializeTabs } from './tabs.js';
import { initializeSearch } from './search.js';
import { loadProducts } from './api.js';
import { renderProductCard } from './productCard.js';

async function initialize() {
    try {
        // Initialize UI components
        initializeTabs();
        initializeSearch();

        // Get product list container
        const productList = document.querySelector('.product-list');
        
        // Show loading state
        productList.innerHTML = '<div class="loading">Loading products...</div>';

        // Load products
        const products = await loadProducts();
        
        // Clear loading state
        productList.innerHTML = '';

        // Render products
        products.forEach(product => {
            const productCard = renderProductCard(product);
            productList.appendChild(productCard);
        });

    } catch (error) {
        console.error('Failed to initialize dashboard:', error);
        const productList = document.querySelector('.product-list');
        productList.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                Failed to load products. Please try again later.
                <button onclick="window.location.reload()" class="retry-button">
                    <i class="fas fa-redo"></i> Retry
                </button>
            </div>
        `;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initialize);