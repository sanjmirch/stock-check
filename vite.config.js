import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 4031,
        proxy: {
            '/api': {
                target: 'http://localhost:4030',
                changeOrigin: true,
                secure: false,
            }
        }
    },
    css: {
        modules: {
            // Enable CSS modules
            localsConvention: 'camelCase',
            generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
    }
}); 