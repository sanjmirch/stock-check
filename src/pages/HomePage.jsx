import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, TextField, Select, MenuItem } from '@mui/material';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { getProducts } from '../services/api';
import { useDebugLog } from '../hooks/useDebugLog';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const { logApi, logError } = useDebugLog();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        logApi('Fetching products for homepage');
        const data = await getProducts();
        setProducts(data);
        logApi('Products fetched successfully', 'log', { count: data.length });
      } catch (err) {
        logError('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [logApi, logError]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'in-stock') return matchesSearch && product.inStock;
    if (filter === 'out-of-stock') return matchesSearch && !product.inStock;
    return matchesSearch;
  });

  if (loading) return <LoadingSpinner message="Loading products..." />;

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          GPU Stock Checker
        </Typography>

        <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label="Search products"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="all">All Products</MenuItem>
            <MenuItem value="in-stock">In Stock</MenuItem>
            <MenuItem value="out-of-stock">Out of Stock</MenuItem>
          </Select>
        </Box>

        {filteredProducts.length === 0 ? (
          <Typography variant="h6" color="text.secondary" align="center">
            No products found
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default HomePage; 