import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const productSlug = product.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography>Brand: {product.brand}</Typography>
        <Typography>Model: {product.model}</Typography>
        <Typography>Price: ${product.price}</Typography>
        <Typography>Memory: {product.specs_memory}</Typography>
        <Typography color={product.inStock ? "success.main" : "error.main"}>
          {product.inStock ? "In Stock" : "Out of Stock"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Store: {product.store}
        </Typography>
        <Button
          component={Link}
          to={`/retailer-stock/${productSlug}`}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Check Retailer Stock
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard; 