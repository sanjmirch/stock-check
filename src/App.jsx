import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RetailerStockPage from './pages/RetailerStockPage';
import DebugPanel from './components/DebugPanel/DebugPanel';
import { useDebugLog } from './hooks/useDebugLog';

function App() {
    const { logApi, logError } = useDebugLog();

    useEffect(() => {
        logApi('Application initialized', 'info', {
            timestamp: new Date().toISOString(),
            url: window.location.href,
            environment: {
                frontend_port: 4031,
                backend_port: 4030,
                node_env: process.env.NODE_ENV
            }
        });

        // Check server connection
        fetch('/api/health')
            .then(response => response.json())
            .then(data => {
                logApi('Server health check successful', 'success', data);
            })
            .catch(error => {
                logError('Server health check failed', error);
            });
    }, []);

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/retailer-stock/:productSlug" element={<RetailerStockPage />} />
            </Routes>
            <DebugPanel />
        </div>
    );
}

export default App; 