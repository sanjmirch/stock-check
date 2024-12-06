async function loadRetailerStock() {
    try {
        const productSlug = window.location.pathname.split('/').pop();
        
        const [productData, retailerData] = await Promise.all([
            loadProductData(productSlug),
            loadRetailerData()
        ]);

        updatePageMetadata(productData);
        
        const productRetailers = retailerData.filter(r => 
            r.product.toLowerCase().replace(/[^a-z0-9]+/g, '-') === productSlug
        );
        
        populateRetailerFilter(productRetailers);
        displayRetailers(productRetailers);
        setupFilters(productRetailers);
        
    } catch (error) {
        console.error('Error loading retailer stock:', error);
        document.getElementById('retailerList').innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                Failed to load retailer stock data. Please try again later.
            </div>
        `;
    }
}

async function loadProductData(productSlug) {
    const response = await fetch('/data/products.csv');
    const csvText = await response.text();
    const products = parseCSV(csvText);
    
    const product = products.find(p => 
        p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === productSlug
    );
    
    if (!product) {
        throw new Error('Product not found');
    }
    
    return product;
}

async function loadRetailerData() {
    const response = await fetch('/data/retailer-stock.csv');
    const csvText = await response.text();
    return parseCSV(csvText);
}

function parseCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(header => header.trim());
    
    return lines.slice(1).map(line => {
        const values = line.split(',').map(value => value.trim());
        const data = {};
        
        headers.forEach((header, index) => {
            data[header] = values[index];
        });
        
        if ('inStock' in data) {
            data.inStock = data.inStock.toLowerCase() === 'true';
        }
        if ('quantity' in data) {
            data.quantity = parseInt(data.quantity);
        }
        
        return data;
    });
}

function updatePageMetadata(product) {
    document.querySelectorAll('.product-name').forEach(el => {
        el.textContent = product.name;
    });
    
    document.title = `${product.name} stock and prices across retailers`;
    document.querySelector('.product-title').textContent = 
        `${product.name} stock and prices across retailers`;
    
    if (product.imageUrl) {
        const imgElement = document.getElementById('productImage');
        imgElement.src = product.imageUrl;
        imgElement.alt = product.name;
    }
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 
        `Check ${product.name} stock availability and prices across different retailers.`
    );
}

function displayRetailers(retailers) {
    const list = document.getElementById('retailerList');
    
    if (retailers.length === 0) {
        list.innerHTML = `
            <div class="error-message">
                No retailers found for this product.
            </div>
        `;
        return;
    }
    
    list.innerHTML = retailers.map(retailer => `
        <div class="retailer-card">
            <img src="/images/retailers/${retailer.retailer.toLowerCase()}.png" 
                 alt="${retailer.retailer}" 
                 class="retailer-logo">
            <div class="retailer-info">
                <div class="retailer-name">${retailer.retailer}</div>
            </div>
            <div class="stock-status ${retailer.inStock ? 'in-stock' : 'out-of-stock'}">
                ${retailer.inStock ? 'In stock' : 'Out of stock'}
            </div>
            ${retailer.inStock ? `
                <a href="${retailer.productUrl}" class="shop-button" target="_blank">
                    Shop <i class="fas fa-arrow-right"></i>
                </a>
            ` : ''}
        </div>
    `).join('');
}

function populateRetailerFilter(retailers) {
    const uniqueRetailers = [...new Set(retailers.map(r => r.retailer))];
    const retailerFilter = document.getElementById('retailerFilter');
    
    uniqueRetailers.forEach(retailer => {
        const option = document.createElement('option');
        option.value = retailer.toLowerCase();
        option.textContent = retailer;
        retailerFilter.appendChild(option);
    });
}

function setupFilters(allRetailers) {
    const stockFilter = document.getElementById('stockFilter');
    const retailerFilter = document.getElementById('retailerFilter');
    
    function filterRetailers() {
        const stockValue = stockFilter.value;
        const retailerValue = retailerFilter.value;
        
        let filtered = [...allRetailers];
        
        if (stockValue === 'in-stock') {
            filtered = filtered.filter(r => r.inStock);
        } else if (stockValue === 'out-of-stock') {
            filtered = filtered.filter(r => !r.inStock);
        }
        
        if (retailerValue !== 'all') {
            filtered = filtered.filter(r => 
                r.retailer.toLowerCase() === retailerValue
            );
        }
        
        displayRetailers(filtered);
    }
    
    stockFilter.addEventListener('change', filterRetailers);
    retailerFilter.addEventListener('change', filterRetailers);
}

document.addEventListener('DOMContentLoaded', loadRetailerStock); 