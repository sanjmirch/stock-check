async function loadRetailerStock() {
    try {
        const response = await fetch('/data/retailer-stock.csv');
        if (!response.ok) {
            throw new Error(`Failed to load retailer stock data: ${response.status}`);
        }
        
        const csvText = await response.text();
        const retailers = parseRetailerCSV(csvText);
        displayRetailers(retailers);
        
        // Setup search functionality
        setupSearch(retailers);
        
    } catch (error) {
        console.error('Error loading retailer stock:', error);
        document.getElementById('retailerGrid').innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                Failed to load retailer stock data. Please try again later.
            </div>
        `;
    }
}

function parseRetailerCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(header => header.trim());
    
    return lines.slice(1).map(line => {
        const values = line.split(',').map(value => value.trim());
        const retailer = {};
        
        headers.forEach((header, index) => {
            retailer[header] = values[index];
        });
        
        retailer.inStock = retailer.inStock.toLowerCase() === 'true';
        retailer.quantity = parseInt(retailer.quantity);
        
        return retailer;
    });
}

function displayRetailers(retailers) {
    const grid = document.getElementById('retailerGrid');
    grid.innerHTML = retailers.map(retailer => `
        <div class="retailer-card">
            <div class="retailer-header">
                <span class="retailer-name">${retailer.retailer}</span>
                <span class="stock-status ${retailer.inStock ? 'in-stock' : 'out-of-stock'}">
                    ${retailer.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
            </div>
            <div class="retailer-details">
                <p><strong>Product:</strong> ${retailer.product}</p>
                <p><strong>Quantity:</strong> <span class="quantity">${retailer.quantity}</span></p>
                <p><strong>Address:</strong> ${retailer.address}</p>
                <p><strong>Last Updated:</strong> ${new Date(retailer.lastUpdated).toLocaleDateString()}</p>
            </div>
        </div>
    `).join('');
}

function setupSearch(retailers) {
    const searchInput = document.querySelector('.search-bar input');
    const filterDropdown = document.querySelector('.filter-dropdown');
    
    function filterRetailers() {
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterDropdown.value;
        
        const filtered = retailers.filter(retailer => {
            const matchesSearch = retailer.retailer.toLowerCase().includes(searchTerm) ||
                                retailer.product.toLowerCase().includes(searchTerm) ||
                                retailer.address.toLowerCase().includes(searchTerm);
                                
            if (filterValue === 'in-stock') {
                return matchesSearch && retailer.inStock;
            } else if (filterValue === 'out-of-stock') {
                return matchesSearch && !retailer.inStock;
            }
            return matchesSearch;
        });
        
        displayRetailers(filtered);
    }
    
    searchInput.addEventListener('input', filterRetailers);
    filterDropdown.addEventListener('change', filterRetailers);
}

document.addEventListener('DOMContentLoaded', loadRetailerStock); 