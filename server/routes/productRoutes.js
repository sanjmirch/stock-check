import express from 'express';
import mongoose from 'mongoose';
import {
  getAllProducts,
  getProductStock,
  searchProducts
} from '../controllers/productController.js';

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/search', searchProducts);
router.get('/products/:slug/stock', getProductStock);
router.get('/health', async (req, res) => {
  try {
    const status = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({
      status,
      readyState: mongoose.connection.readyState,
      details: {
        host: mongoose.connection.host,
        port: mongoose.connection.port,
        name: mongoose.connection.name,
        models: Object.keys(mongoose.models),
        collections: await mongoose.connection.db?.collections()
          .then(collections => collections.map(c => c.collectionName))
          .catch(() => [])
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
      details: {
        name: error.name,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }
    });
  }
});

export default router; 