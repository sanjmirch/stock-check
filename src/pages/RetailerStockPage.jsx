import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Container, Typography, Card, CardContent, Button, Alert } from '@mui/material';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { useDebugLog } from '../hooks/useDebugLog';

const RetailerStockPage = () => {
    const { productSlug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { logApi, logError } = useDebugLog();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                logApi(`Fetching product details for ${productSlug}`);
                const response = await fetch(`/api/products/${productSlug}/stock`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProduct(data);
                logApi('Product details fetched successfully', 'success', data);
            } catch (err) {
                setError(err.message);
                logError('Failed to fetch product details', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productSlug]);

    if (loading) return <LoadingSpinner message="Loading product details..." />;
    if (error) return <Alert severity="error">{error}</Alert>;
    if (!product) return <Alert severity="warning">Product not found</Alert>;

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Button variant="outlined" sx={{ mb: 2 }}>
                        Back to Products
                    </Button>
                </Link>
                
                <Typography variant="h4" component="h1" gutterBottom>
                    {product.product.name}
                </Typography>

                <Card sx={{ mb: 4 }}>
                    <CardContent>
                        <Typography variant="h6">Product Details</Typography>
                        <Typography>Brand: {product.product.brand}</Typography>
                        <Typography>Model: {product.product.model}</Typography>
                        <Typography>Price: ${product.product.price}</Typography>
                    </CardContent>
                </Card>

                <Typography variant="h5" gutterBottom>
                    Retailer Stock Information
                </Typography>

                {product.retailers.map((retailer, index) => (
                    <Card key={index} sx={{ mb: 2 }}>
                        <CardContent>
                            <Typography variant="h6">{retailer.retailer}</Typography>
                            <Typography color={retailer.inStock ? "success.main" : "error.main"}>
                                {retailer.inStock ? `In Stock (${retailer.quantity} available)` : 'Out of Stock'}
                            </Typography>
                            {retailer.inStock && (
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    href={retailer.productUrl}
                                    target="_blank"
                                    sx={{ mt: 2 }}
                                >
                                    Buy Now
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default RetailerStockPage; 