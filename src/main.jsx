import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/main.css';

// Add error boundary for better error handling
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Window Error: ', {
        message: msg,
        url: url,
        lineNo: lineNo,
        columnNo: columnNo,
        error: error
    });
    return false;
};

// Add debugging information
console.log('Application Starting...', {
    environment: import.meta.env.MODE,
    baseUrl: import.meta.env.BASE_URL,
    time: new Date().toISOString()
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
