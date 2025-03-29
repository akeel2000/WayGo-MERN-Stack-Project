import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserCards = () => {
  const [cards, setCards] = useState([]);
  const [form, setForm] = useState({ cardHolderName: "", cardNumber: "", expiryDate: "", cvv: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCards = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/cards', { withCredentials: true });
      setCards(res.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('http://localhost:5000/api/cards', form, { withCredentials: true });
      setForm({ cardHolderName: "", cardNumber: "", expiryDate: "", cvv: "" });
      fetchCards();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving card:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      setIsLoading(true);
      try {
        await axios.delete(`http://localhost:5000/api/cards/${id}`, { withCredentials: true });
        fetchCards();
      } catch (error) {
        console.error("Error deleting card:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="pt-24 p-4 max-w-4xl mx-auto min-h-screen bg-amber-50/20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-amber-900">Your Saved Cards</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg shadow-md hover:from-amber-600 hover:to-amber-700 transition-all"
        >
          Add New Card
        </button>
      </div>

      {/* Add Card Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-amber-900">Add New Card</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
  <label className="block text-sm font-medium text-amber-800 mb-1">Cardholder Name</label>
  <input
    type="text"
    placeholder="John Doe"
    value={form.cardHolderName}
    onChange={(e) => {
      const value = e.target.value;
      // Allow only letters and spaces
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setForm({ ...form, cardHolderName: value });
      }
    }}
    required
    className="border border-amber-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
  />
  {form.cardHolderName && !/^[a-zA-Z\s]+$/.test(form.cardHolderName) && (
    <p className="text-sm text-red-500 mt-1">Please enter a valid name (letters and spaces only).</p>
  )}
</div>

<div>
  <label className="block text-sm font-medium text-amber-800 mb-1">Card Number</label>
  <input
    type="text"
    placeholder="1234 5678 9012 3456"
    value={form.cardNumber}
    onChange={(e) => {
      let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
      if (value.length > 16) value = value.slice(0, 16); // Limit to 16 digits
      const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 "); // Add space every 4 digits
      setForm({ ...form, cardNumber: formattedValue });
    }}
    required
    className="border border-amber-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
  />
  {form.cardNumber.replace(/\s/g, "").length !== 16 && (
    <p className="text-sm text-red-500 mt-1">Card number must be 16 digits.</p>
  )}
</div>

              <div className="grid grid-cols-2 gap-4">
              <div>
  <label className="block text-sm font-medium text-amber-800 mb-1">Expiry Date</label>
  <input
    type="text"
    placeholder="MM/YY"
    value={form.expiryDate}
    onChange={(e) => {
      let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
      if (value.length > 4) value = value.slice(0, 4); // Limit to 4 digits
      if (value.length >= 3) value = `${value.slice(0, 2)}/${value.slice(2)}`; // Add '/' after the first 2 digits
      setForm({ ...form, expiryDate: value });
    }}
    required
    className="border border-amber-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
  />
  {form.expiryDate && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiryDate) && (
    <p className="text-sm text-red-500 mt-1">Please enter a valid expiry date (MM/YY).</p>
  )}
</div>

<div>
  <label className="block text-sm font-medium text-amber-800 mb-1">CVV</label>
  <input
    type="password"
    placeholder="123"
    value={form.cvv}
    onChange={(e) => {
      let value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
      if (value.length > 3) value = value.slice(0, 3); // Limit to 3 digits
      setForm({ ...form, cvv: value });
    }}
    required
    className="border border-amber-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
  />
  {form.cvv && form.cvv.length !== 3 && (
    <p className="text-sm text-red-500 mt-1">CVV must be exactly 3 digits.</p>
  )}
</div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-amber-300 text-amber-800 rounded-lg hover:bg-amber-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2 rounded-lg shadow hover:from-amber-600 hover:to-amber-700 transition-all disabled:opacity-70"
                >
                  {isLoading ? 'Saving...' : 'Save Card'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cards List */}
      {isLoading && cards.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      ) : cards.length === 0 ? (
        <div className="text-center py-12 bg-amber-50/50 rounded-lg border border-amber-100">
          <p className="text-amber-800">No cards saved yet. Add your first card to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((card) => (
            <div
              key={card._id}
              className="border border-amber-200 p-6 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow hover:border-amber-300 relative"
            >
              <div className="absolute top-4 right-4">
                {card.isAdmin && (
                  <span className="bg-gradient-to-r from-amber-400 to-amber-600 text-white text-xs px-2 py-1 rounded-full">
                    Admin
                  </span>
                )}
              </div>

              <div className="flex items-center mb-4">
                <div className="bg-amber-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                  {card.cardHolderName.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-bold text-lg text-amber-900">{card.cardHolderName}</h3>
              </div>

              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="text-amber-800 font-medium">Card No:</span>
                  <span className="ml-2 font-mono tracking-wider">•••• •••• •••• {card.cardNumber.slice(-4)}</span>
                </p>
                <p className="text-gray-700">
                  <span className="text-amber-800 font-medium">Expiry:</span>
                  <span className="ml-2">{card.expiryDate}</span>
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleDelete(card._id)}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-red-400 to-red-500 text-white px-4 py-2 rounded-lg text-sm hover:from-red-500 hover:to-red-600 transition-all disabled:opacity-70"
                >
                  {isLoading ? 'Deleting...' : 'Delete Card'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCards;
