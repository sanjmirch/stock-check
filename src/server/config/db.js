import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const DEFAULT_URI = 'mongodb://localhost:27017/stock-checker';

export async function connectDB() {
    try {
        const uri = process.env.MONGODB_URI || DEFAULT_URI;
        logger.info(`Connecting to MongoDB at: ${uri}`);
        
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        logger.info('Successfully connected to MongoDB');
        return mongoose.connection;
    } catch (error) {
        logger.error('MongoDB connection error:', error);
        throw error;
    }
}

export async function getCollection(collectionName) {
    if (!mongoose.connection.readyState) {
        await connectDB();
    }
    return mongoose.connection.collection(collectionName);
}

export async function closeConnection() {
    try {
        if (mongoose.connection) {
            await mongoose.connection.close();
            logger.info('MongoDB connection closed');
        }
    } catch (error) {
        logger.error('Error closing MongoDB connection:', error);
        throw error;
    }
}

// Handle process termination
process.on('SIGINT', async () => {
    await closeConnection();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await closeConnection();
    process.exit(0);
});