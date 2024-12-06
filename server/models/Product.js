import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  specs_memory: String,
  specs_coreClock: String,
  specs_boostClock: String,
  specs_cudaCores: mongoose.Schema.Types.Mixed,
  inStock: Boolean,
  store: String
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema, 'products'); 