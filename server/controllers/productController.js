import Product from '../models/Product.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.setHeader('Content-Type', 'application/json');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getProductStock = async (req, res) => {
  try {
    const productSlug = req.params.slug;
    const productName = productSlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const product = await Product.findOne({
      name: new RegExp(productName, 'i')
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Format the response
    const response = {
      product: {
        name: product.name,
        brand: product.brand,
        model: product.model,
        price: product.price,
        specs: {
          memory: product.specs_memory,
          coreClock: product.specs_coreClock,
          boostClock: product.specs_boostClock,
          cudaCores: product.specs_cudaCores
        },
        imageUrl: `/images/products/${productSlug}.jpg`
      },
      retailers: [{
        retailer: product.store,
        inStock: product.inStock,
        quantity: product.inStock ? Math.floor(Math.random() * 10) + 1 : 0,
        lastUpdated: new Date(),
        address: "Store Location", // You might want to add this to your schema
        productUrl: `https://${product.store.toLowerCase().replace(/\s+/g, '')}.com/product/${productSlug}`
      }]
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    const products = await Product.find({
      $or: [
        { name: new RegExp(query, 'i') },
        { brand: new RegExp(query, 'i') },
        { model: new RegExp(query, 'i') }
      ]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 