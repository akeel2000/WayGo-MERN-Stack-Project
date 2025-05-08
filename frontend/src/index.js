import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast'; // ✅ Add this

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <App />
        <Toaster position="top-center" reverseOrder={false} /> {/* ✅ Show toast messages */}
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);
