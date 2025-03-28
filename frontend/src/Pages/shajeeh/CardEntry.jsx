// Pages/shajeeh/CardEntry.jsx
import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CardEntry = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [form, setForm] = useState({ cardHolderName: "", cardNumber: "", expiryDate: "", cvv: "" });
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => {
    const rent = item.rentPerDay ?? item.price ?? 0;
    const days = item.days ?? 1;
    return sum + rent * days;
  }, 0);

  const handlePayment = async (e) => {
    e.preventDefault();

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
    }
  };

  const handleCash = async () => {
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
    }
  };

  return (
    <div className="pt-24 max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Enter Card Details</h2>
      <form onSubmit={handlePayment} className="space-y-4">
        <input required placeholder="Name" value={form.cardHolderName}
          onChange={e => setForm({ ...form, cardHolderName: e.target.value })}
          className="border p-2 w-full" />
        <input required placeholder="Card Number" value={form.cardNumber}
          onChange={e => setForm({ ...form, cardNumber: e.target.value })}
          className="border p-2 w-full" />
        <input required placeholder="MM/YY" value={form.expiryDate}
          onChange={e => setForm({ ...form, expiryDate: e.target.value })}
          className="border p-2 w-full" />
        <input required placeholder="CVV" value={form.cvv}
          onChange={e => setForm({ ...form, cvv: e.target.value })}
          className="border p-2 w-full" />

        <div className="text-right font-bold">Total: Rs {total}</div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Pay with Card</button>
      </form>

      <button onClick={handleCash} className="mt-4 w-full bg-yellow-500 text-white px-4 py-2 rounded">
        Pay with Cash
      </button>
    </div>
  );
};

export default CardEntry;
