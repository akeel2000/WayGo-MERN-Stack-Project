// context/CartContext.js
import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const exists = cartItems.find((i) => i.id === item.id);
    if (!exists) {
      setCartItems([...cartItems, { ...item, days: 1 }]);
    }
  };

  const updateItem = (id, newDays) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, days: newDays } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
