import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { logger } from './utils/logger.js';
import { getAllProducts, searchProducts, getProductById, getProductsByShop } from './models/productModel.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4020;

// CORS configuration
app.use(cors({
  origin: ['http://localhost:4021']
}));

app.use(express.json());

// Connect to MongoDB when server starts
(async () => {
  try {
    await connectDB();
    
    // Health check route
    app.get('/api/health', (req, res) => {
      res.json({
        status: 'ok',
        timestamp: new Date(),
        mongoStatus: 'connected'
      });
    });

    // Routes
    app.get('/api/products', async (req, res) => {
      try {
        const products = await getAllProducts();
        res.json(products);
      } catch (error) {
        logger.error('Error in GET /api/products:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.get('/api/products/search', async (req, res) => {
      try {
        const { query } = req.query;
        const products = await searchProducts(query);
        res.json(products);
      } catch (error) {
        logger.error('Error in GET /api/products/search:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    app.get('/api/products/:slug/stock', async (req, res) => {
      try {
        const product = await getProductById(req.params.slug);
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
        logger.error('Error in GET /api/products/:slug/stock:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    const server = app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        logger.error(`Port ${PORT} is already in use. Trying port ${PORT + 1}`);
        server.listen(PORT + 1);
      } else {
        logger.error('Server error:', error);
        process.exit(1);
      }
    });

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
})();