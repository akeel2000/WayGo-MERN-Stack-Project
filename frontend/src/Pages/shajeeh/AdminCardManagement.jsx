import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCardManagement = () => {
  const [cards, setCards] = useState([]);
  const [editCard, setEditCard] = useState(null);
  const [form, setForm] = useState({ cardHolderName: '', cardNumber: '', expiryDate: '', cvv: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  const fetchCards = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/cards/admin/all', { withCredentials: true });
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
    setIsLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/cards/${editCard}`, form, { withCredentials: true });
      setEditCard(null);
      setForm({ cardHolderName: '', cardNumber: '', expiryDate: '', cvv: '' });
      fetchCards();
    } catch (error) {
      console.error("Error updating card:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setCardToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/cards/${cardToDelete}`, { withCredentials: true });
      fetchCards();
    } catch (error) {
      console.error("Error deleting card:", error);
    } finally {
      setIsLoading(false);
      setIsConfirmOpen(false);
      setCardToDelete(null);
    }
  };

  return (
    <div className="pt-1 p-4 max-w-6xl mx-auto min-h-screen bg-amber-50/20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Admin: All User Cards</h2>
        <p className="text-gray-600 mt-1">Manage your users card</p>
      </div>

      {isLoading && cards.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      ) : cards.length === 0 ? (
        <div className="text-center py-12 bg-amber-50/50 rounded-lg border border-amber-100">
          <p className="text-amber-800">No cards found in the system.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-amber-100">
          <table className="min-w-full divide-y divide-amber-200">
            <thead className="bg-amber-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">User</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Card Details</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Expiry</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-amber-800 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-amber-200">
              {cards.map((card) => (
                <tr key={card._id} className="hover:bg-amber-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-amber-500 text-white rounded-full flex items-center justify-center">
                        {card.userId?.email?.charAt(0).toUpperCase() || '?'}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{card.userId?.email || 'Unknown User'}</div>
                        {card.userId?.isAdmin && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-white">
                            Admin
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">{card.cardHolderName}</div>
                    <div className="text-sm text-gray-500 font-mono">•••• •••• •••• {card.cardNumber.slice(-4)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {card.expiryDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(card)}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-md text-sm hover:from-amber-600 hover:to-orange-600 transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(card._id)}
                        className="bg-gradient-to-r from-red-400 to-red-500 text-white px-3 py-1 rounded-md text-sm hover:from-red-500 hover:to-red-600 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-amber-900">Edit Card</h3>
              <button
                onClick={() => setEditCard(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  value={form.cardHolderName}
                  onChange={e => setForm({ ...form, cardHolderName: e.target.value })}
                  className="border border-amber-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-800 mb-1">Card Number</label>
                <input
                  type="text"
                  value={form.cardNumber}
                  onChange={e => setForm({ ...form, cardNumber: e.target.value })}
                  className="border border-amber-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    value={form.expiryDate}
                    onChange={e => setForm({ ...form, expiryDate: e.target.value })}
                    className="border border-amber-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-800 mb-1">CVV</label>
                  <input
                    type="text"
                    value={form.cvv}
                    onChange={e => setForm({ ...form, cvv: e.target.value })}
                    className="border border-amber-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setEditCard(null)}
                  className="px-4 py-2 border border-amber-300 text-amber-800 rounded-lg hover:bg-amber-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-lg shadow hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-70"
                >
                  {isLoading ? 'Updating...' : 'Update Card'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-amber-900">Confirm Deletion</h3>
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-700 mb-6">Are you sure you want to delete this card? This action cannot be undone.</p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2 border border-amber-300 text-amber-800 rounded-lg hover:bg-amber-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isLoading}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-lg shadow hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-70"
              >
                {isLoading ? 'Deleting...' : 'Delete Card'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCardManagement;
