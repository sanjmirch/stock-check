import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Enable CORS for your Vite frontend
app.use(cors({
  origin: 'http://localhost:4002'
}));

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/stock-checker')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  model: String,
  price: Number,
  specs_memory: String,
  specs_coreClock: String,
  specs_boostClock: String,
  specs_cudaCores: mongoose.Schema.Types.Mixed,
  inStock: Boolean,
  store: String
});

const Product = mongoose.model('Product', productSchema);

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    mongoStatus: mongoose.connection.readyState
  });
});

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/products/:slug/stock', async (req, res) => {
  try {
    const productName = req.params.slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const product = await Product.findOne({
      name: new RegExp(productName, 'i')
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
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
        }
      },
      retailers: [{
        retailer: product.store,
        inStock: product.inStock,
        quantity: product.inStock ? Math.floor(Math.random() * 10) + 1 : 0,
        address: "Store Location",
        lastUpdated: new Date(),
        productUrl: `https://${product.store.toLowerCase()}.com/product/${req.params.slug}`
      }]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 