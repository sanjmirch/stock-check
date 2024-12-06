import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RetailerStockPage from './pages/RetailerStockPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/retailer-stock/:productSlug" element={<RetailerStockPage />} />
      </Routes>
    </Router>
  );
}

export default App; 