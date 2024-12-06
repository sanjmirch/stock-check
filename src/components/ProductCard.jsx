import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const productSlug = product.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Typography color="text.secondary">
          Brand: {product.brand}
        </Typography>
        <Typography color="text.secondary">
          Model: {product.model}
        </Typography>
        <Typography color="text.secondary">
          Price: ${product.price}
        </Typography>
        <Typography color="text.secondary">
          Memory: {product.specs_memory}
        </Typography>
        <Typography 
          color={product.inStock ? "success.main" : "error.main"}
          sx={{ mt: 1 }}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </Typography>
        {product.store && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Store: {product.store}
          </Typography>
        )}
        <Button
          component={Link}
          to={`/retailer-stock/${productSlug}`}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          fullWidth
        >
          Check Retailer Stock
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard; 