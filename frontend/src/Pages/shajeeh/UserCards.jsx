import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserCards = () => {
  const [cards, setCards] = useState([]);
  const [form, setForm] = useState({ cardHolderName: "", cardNumber: "", expiryDate: "", cvv: "" });

  const fetchCards = async () => {
    const res = await axios.get('http://localhost:5000/api/cards', { withCredentials: true });
    setCards(res.data);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/cards', form, { withCredentials: true });
    setForm({ cardHolderName: "", cardNumber: "", expiryDate: "", cvv: "" });
    fetchCards();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/cards/${id}`, { withCredentials: true });
    fetchCards();
  };

  return (
    <div className="pt-24 p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Saved Cards</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input type="text" placeholder="Cardholder Name" value={form.cardHolderName}
          onChange={e => setForm({ ...form, cardHolderName: e.target.value })} required className="border p-2 w-full" />
        <input type="text" placeholder="Card Number" value={form.cardNumber}
          onChange={e => setForm({ ...form, cardNumber: e.target.value })} required className="border p-2 w-full" />
        <input type="text" placeholder="MM/YY" value={form.expiryDate}
          onChange={e => setForm({ ...form, expiryDate: e.target.value })} required className="border p-2 w-full" />
        <input type="password" placeholder="CVV" value={form.cvv}
          onChange={e => setForm({ ...form, cvv: e.target.value })} required className="border p-2 w-full" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Save Card</button>
      </form>

      {cards.length === 0 ? <p>No cards saved yet.</p> : (
        <div className="space-y-4">
          {cards.map((card) => (
            <div key={card._id} className="border p-4 rounded shadow">
              <p><strong>{card.cardHolderName}</strong></p>
              <p>Card No: **** **** **** {card.cardNumber.slice(-4)}</p>
              <p>Expiry: {card.expiryDate}</p>
              <button onClick={() => handleDelete(card._id)} className="text-red-500 underline mt-2">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCards;
