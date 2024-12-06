import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  Box,
  Breadcrumbs,
  Link,
  Button,
} from '@mui/material';
import { getProductStock } from '../services/api';

const RetailerStockPage = () => {
  const { productSlug } = useParams();
  const [product, setProduct] = useState(null);
  const [retailers, setRetailers] = useState([]);
  const [filters, setFilters] = useState({
    stock: 'all',
    price: 'all',
    retailer: 'all',
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getProductStock(productSlug);
        setProduct(data.product);
        setRetailers(data.retailers);
      } catch (error) {
        console.error('Error loading retailer stock:', error);
      }
    };
    loadData();
  }, [productSlug]);

  const filteredRetailers = retailers.filter((retailer) => {
    if (filters.stock === 'in-stock' && !retailer.inStock) return false;
    if (filters.stock === 'out-of-stock' && retailer.inStock) return false;
    if (filters.retailer !== 'all' && retailer.retailer.toLowerCase() !== filters.retailer) return false;
    return true;
  });

  return (
    <Container maxWidth="lg">
      <Breadcrumbs sx={{ my: 2 }}>
        <Link href="/">Home</Link>
        <Typography>{product?.name || 'Loading...'}</Typography>
      </Breadcrumbs>

      <Box sx={{ mb: 4, p: 2, bgcolor: '#1a1f2e', color: 'white', borderRadius: 1 }}>
        <Typography variant="h4">{product?.name} stock and prices across retailers</Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Select
            fullWidth
            value={filters.stock}
            onChange={(e) => setFilters({ ...filters, stock: e.target.value })}
          >
            <MenuItem value="all">Stock</MenuItem>
            <MenuItem value="in-stock">In Stock</MenuItem>
            <MenuItem value="out-of-stock">Out of Stock</MenuItem>
          </Select>
        </Grid>
        {/* Add other filters here */}
      </Grid>

      {filteredRetailers.map((retailer) => (
        <Card key={retailer.retailer} sx={{ mb: 2 }}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <img
                src={`/images/retailers/${retailer.retailer.toLowerCase()}.png`}
                alt={retailer.retailer}
                style={{ width: 100, height: 50, objectFit: 'contain' }}
              />
              <Typography variant="h6">{retailer.retailer}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 10,
                  bgcolor: retailer.inStock ? '#e8f5e9' : '#ffebee',
                  color: retailer.inStock ? '#2e7d32' : '#c62828',
                }}
              >
                {retailer.inStock ? 'In stock' : 'Out of stock'}
              </Typography>
              {retailer.inStock && (
                <Button
                  variant="contained"
                  color="primary"
                  href={retailer.productUrl}
                  target="_blank"
                >
                  Shop
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default RetailerStockPage; 