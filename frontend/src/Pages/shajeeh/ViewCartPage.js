import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaArrowLeft, FaCreditCard } from "react-icons/fa";

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
      totalAmount += item.rentPerDay * item.quantity;
    });
    setTotal(totalAmount);
  };

  const handleCheckout = () => {
    // Implement checkout functionality
    alert("Proceeding to checkout...");
  };

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  return (
    <div className="bg-amber-50 text-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-center py-24 px-4 bg-gradient-to-r from-amber-400 to-orange-500">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md">
            Your Rental Cart
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto mb-8">
            Review your selected items before checkout
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link
              to="/"
              className="flex items-center text-amber-700 hover:text-amber-900 transition-colors"
            >
              <FaArrowLeft className="mr-2" /> Continue Shopping
            </Link>

            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Cart Summary
            </h2>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12 bg-amber-50/50 rounded-lg border border-amber-100">
              <p className="text-amber-800">Your cart is empty. Start adding some rentals!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="border border-amber-200 p-6 rounded-xl bg-white hover:shadow-md transition-shadow flex flex-col sm:flex-row"
                  >
                    <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg w-24 h-24 flex items-center justify-center">
                        <FaCreditCard className="text-3xl" />
                      </div>
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-xl font-bold text-amber-900 mb-2">{item.name}</h3>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <p className="text-amber-800">
                          <span className="font-medium">Price:</span> ${item.rentPerDay}/day
                        </p>
                        <p className="text-amber-800">
                          <span className="font-medium">Quantity:</span> {item.quantity}
                        </p>
                        <p className="text-amber-800">
                          <span className="font-medium">Subtotal:</span> ${item.rentPerDay * item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="self-end">
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                        title="Remove Item"
                      >
                        <FaTrash className="text-xl" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="border border-amber-200 p-6 rounded-xl bg-white">
                  <h3 className="text-xl font-bold text-amber-900 mb-4">Order Summary</h3>

                  <div className="space-y-3 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-amber-800">{item.name} (x{item.quantity})</span>
                        <span className="font-medium">${item.rentPerDay * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-amber-200 pt-4 mb-6">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg shadow hover:from-purple-600 hover:to-purple-700 transition-all"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default CartPage;
