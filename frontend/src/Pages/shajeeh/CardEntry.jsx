// Pages/shajeeh/CardEntry.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CardEntry = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({ cardHolderName: "", cardNumber: "", expiryDate: "", cvv: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => {
    const rent = item.rentPerDay ?? item.price ?? 0;
    const days = item.days ?? 1;
    return sum + rent * days;
  }, 0);

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Save card
      await fetch("http://localhost:5000/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      // Save booking
      await fetch("http://localhost:5000/api/cart/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ items: cartItems, total }),
      });

      clearCart();
      navigate("/success");
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCash = async () => {
    setIsProcessing(true);
    try {
      await fetch("http://localhost:5000/api/cart/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ items: cartItems, total }),
      });

      clearCart();
      navigate("/success");
    } catch (err) {
      alert("Error with cash booking");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Payment Details</h2>
            <div className="flex space-x-2">
              <div className="w-10 h-6 bg-blue-500 rounded-sm"></div>
              <div className="w-6 h-6 bg-yellow-500 rounded-sm"></div>
              <div className="w-6 h-6 bg-red-500 rounded-sm"></div>
            </div>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Amount</span>
              <span className="text-2xl font-bold text-blue-600">Rs {total.toLocaleString()}</span>
            </div>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            <div className="space-y-4">
            <div>
  <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700 mb-1">
    Cardholder Name
  </label>
  <input
    id="cardHolderName"
    required
    placeholder="John Doe"
    value={form.cardHolderName}
    onChange={(e) => {
      const value = e.target.value;
      // Allow only letters and spaces
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setForm({ ...form, cardHolderName: value });
      }
    }}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
  />
  {form.cardHolderName && !/^[a-zA-Z\s]+$/.test(form.cardHolderName) && (
    <p className="text-sm text-red-500 mt-1">Please enter a valid name (letters and spaces only).</p>
  )}
</div>

<div>
  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
    Card Number
  </label>
  <input
    id="cardNumber"
    required
    placeholder="1234 5678 9012 3456"
    value={form.cardNumber}
    onChange={(e) => {
      let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
      if (value.length > 16) value = value.slice(0, 16); // Limit to 16 digits
      const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 "); // Add space every 4 digits
      setForm({ ...form, cardNumber: formattedValue });
    }}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
  />
  {form.cardNumber.replace(/\s/g, "").length !== 16 && (
    <p className="text-sm text-red-500 mt-1">Card number must be 16 digits.</p>
  )}
</div>

              <div className="grid grid-cols-2 gap-4">
              <div>
  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
    Expiry Date
  </label>
  <input
    id="expiryDate"
    required
    placeholder="MM/YY"
    value={form.expiryDate}
    onChange={(e) => {
      let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
      if (value.length > 4) value = value.slice(0, 4); // Limit to 4 digits
      if (value.length >= 3) value = `${value.slice(0, 2)}/${value.slice(2)}`; // Add '/' after the first 2 digits
      setForm({ ...form, expiryDate: value });
    }}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
  />
  {form.expiryDate && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiryDate) && (
    <p className="text-sm text-red-500 mt-1">Please enter a valid expiry date (MM/YY).</p>
  )}
</div>

<div>
  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
    CVV
  </label>
  <input
    id="cvv"
    required
    placeholder="123"
    value={form.cvv}
    onChange={(e) => {
      let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
      if (value.length > 3) value = value.slice(0, 3); // Limit to 3 digits
      setForm({ ...form, cvv: value });
    }}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
  />
  {form.cvv && form.cvv.length !== 3 && (
    <p className="text-sm text-red-500 mt-1">CVV must be exactly 3 digits.</p>
  )}
</div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition ${isProcessing ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : 'Pay with Card'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEntry;
