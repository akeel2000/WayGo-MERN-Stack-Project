import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);
    calculateTotal(cartItems);
  }, []);

  const calculateTotal = (cartItems) => {
    let totalAmount = 0;
    cartItems.forEach((item) => {
      totalAmount += item.rentPerDay * item.quantity; // Rent per day * quantity
    });
    setTotal(totalAmount);
  };

  const handleCheckout = () => {
    // Implement checkout functionality (could be a form submission, etc.)
    alert("Proceeding to checkout...");
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  return (
    <div className="pt-24 p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="border p-4 mb-4 rounded shadow">
              <h2 className="text-xl font-bold">{item.name}</h2>
              <p>Rent per Day: ${item.rentPerDay}</p>
              <p>Quantity: {item.quantity}</p>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Summary */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Total: ${total}</h3>
            <button
              onClick={handleCheckout}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
