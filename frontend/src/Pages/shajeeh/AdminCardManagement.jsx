import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCardManagement = () => {
  const [cards, setCards] = useState([]);
  const [editCard, setEditCard] = useState(null);
  const [form, setForm] = useState({ cardHolderName: '', cardNumber: '', expiryDate: '', cvv: '' });

  const fetchCards = async () => {
    const res = await axios.get('http://localhost:5000/api/cards/admin/all', { withCredentials: true });
    setCards(res.data);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleEdit = (card) => {
    setEditCard(card._id);
    setForm({
      cardHolderName: card.cardHolderName,
      cardNumber: card.cardNumber,
      expiryDate: card.expiryDate,
      cvv: card.cvv,
    });
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:5000/api/cards/${editCard}`, form, { withCredentials: true });
    setEditCard(null);
    setForm({ cardHolderName: '', cardNumber: '', expiryDate: '', cvv: '' });
    fetchCards();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/cards/${id}`, { withCredentials: true });
    fetchCards();
  };

  return (
    <div className="pt-24 p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Admin: All User Cards</h2>

      {cards.map((card) => (
        <div key={card._id} className="border p-4 rounded mb-4 bg-white shadow">
          <p>User: {card.userId?.email || 'Unknown'}</p>
          <p><strong>Name:</strong> {card.cardHolderName}</p>
          <p><strong>Card:</strong> **** **** **** {card.cardNumber.slice(-4)}</p>
          <p><strong>Expiry:</strong> {card.expiryDate}</p>

          <div className="flex gap-2 mt-2">
            <button onClick={() => handleEdit(card)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
            <button onClick={() => handleDelete(card._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
          </div>
        </div>
      ))}

      {editCard && (
        <div className="bg-gray-100 p-4 mt-6 rounded">
          <h3 className="text-lg font-semibold mb-2">Edit Card</h3>
          <input type="text" placeholder="Name" value={form.cardHolderName} onChange={e => setForm({ ...form, cardHolderName: e.target.value })} className="w-full border p-2 mb-2" />
          <input type="text" placeholder="Card Number" value={form.cardNumber} onChange={e => setForm({ ...form, cardNumber: e.target.value })} className="w-full border p-2 mb-2" />
          <input type="text" placeholder="Expiry" value={form.expiryDate} onChange={e => setForm({ ...form, expiryDate: e.target.value })} className="w-full border p-2 mb-2" />
          <input type="text" placeholder="CVV" value={form.cvv} onChange={e => setForm({ ...form, cvv: e.target.value })} className="w-full border p-2 mb-2" />
          <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
        </div>
      )}
    </div>
  );
};

export default AdminCardManagement;
