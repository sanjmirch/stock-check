import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

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

export async function getAllProducts() {
    try {
        return await Product.find();
    } catch (error) {
        logger.error('Error fetching products:', error);
        throw error;
    }
}

export async function getProductById(slug) {
    try {
        const productName = slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        
        return await Product.findOne({ name: new RegExp(productName, 'i') });
    } catch (error) {
        logger.error(`Error fetching product with slug ${slug}:`, error);
        throw error;
    }
}

export async function searchProducts(query) {
    try {
        return await Product.find({
            $or: [
                { name: new RegExp(query, 'i') },
                { brand: new RegExp(query, 'i') },
                { model: new RegExp(query, 'i') }
            ]
        });
    } catch (error) {
        logger.error('Error searching products:', error);
        throw error;
    }
}

export async function getProductsByShop(shopId) {
    try {
        const collection = await getCollection('products');
        return await collection.find({
            shops: new ObjectId(shopId)
        }).toArray();
    } catch (error) {
        logger.error(`Error fetching products for shop ${shopId}:`, error);
        throw error;
    }
}