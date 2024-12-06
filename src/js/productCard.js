export function renderProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Create URL-friendly slug from product name
    const productSlug = product.name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    
    card.innerHTML = `
        <div class="product-info">
            <h3>${product.name}</h3>
            <p class="stock-level">Stock: ${product.stockLevel}</p>
            <p class="last-updated">Last updated: ${new Date(product.lastUpdated).toLocaleDateString()}</p>
            <a href="/retailer-stock/${productSlug}" class="check-retailers-btn">
                <i class="fas fa-store"></i> Check Retailer Stock
            </a>
        </div>
        <div class="product-actions">
            <button class="edit-button">
                <i class="fas fa-edit"></i>
            </button>
            <button class="delete-button">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    return card;
}