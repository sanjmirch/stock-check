import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Application configuration object
 * Centralizes all configuration values and provides environment-specific settings
 */
const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 4020,
    env: process.env.NODE_ENV || 'development',
    cors: {
      origin: process.env.NODE_ENV === 'production' 
        ? process.env.ALLOWED_ORIGINS?.split(',') 
        : ['http://localhost:4021']
    }
  },

  // Database configuration
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/stock-checker',
    name: process.env.DB_NAME || 'stock-checker',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },

  // API configuration
  api: {
    baseUrl: process.env.API_BASE_URL || '/api',
    timeout: parseInt(process.env.API_TIMEOUT) || 5000
  },

  // Feature flags
  features: {
    enableDebugPanel: process.env.ENABLE_DEBUG_PANEL === 'true',
    enableCache: process.env.ENABLE_CACHE === 'true'
  }
};

export default config; 