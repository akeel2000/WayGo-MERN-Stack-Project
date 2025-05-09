import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCardManagement = () => {
  const [cards, setCards] = useState([]);
  const [editCard, setEditCard] = useState(null);
  const [form, setForm] = useState({
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  const fetchCards = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/cards/admin/all', {
        withCredentials: true
      });
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
    setErrors({});
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/cards/${editCard}`,
        form,
        { withCredentials: true }
      );

      setCards(cards.map(card =>
        card._id === editCard ? { ...card, ...response.data } : card
      ));

      setEditCard(null);
      setForm({ cardHolderName: '', cardNumber: '', expiryDate: '', cvv: '' });
      setErrors({});
    } catch (error) {
      console.error("Error updating card:", error);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
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
      await axios.delete(`http://localhost:5000/api/cards/${cardToDelete}`, {
        withCredentials: true
      });
      setCards(cards.filter(card => card._id !== cardToDelete));
    } catch (error) {
      console.error("Error deleting card:", error);
    } finally {
      setIsLoading(false);
      setIsConfirmOpen(false);
      setCardToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Admin: All User Cards</h2>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your users' payment cards</p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && cards.length === 0 && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        )}

        {/* Empty State */}
        {cards.length === 0 && !isLoading ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-800">No cards found</h3>
            <p className="mt-2 text-sm text-gray-600">All user payment cards will appear here</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">User</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Card Details</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Expiry</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {cards.map((card) => (
                    <tr key={card._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-500 text-white rounded-full flex items-center justify-center">
                            {card.userId?.email?.charAt(0).toUpperCase() || '?'}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{card.userId?.email || 'Unknown User'}</div>
                            {card.userId?.isAdmin && (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white mt-1">
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
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(card)}
                            className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg text-sm hover:from-blue-600 hover:to-indigo-600 transition-all shadow-sm hover:shadow-md flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(card._id)}
                            className="px-3 py-1.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg text-sm hover:from-rose-600 hover:to-pink-600 transition-all shadow-sm hover:shadow-md flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edit Modal */}
       {editCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Edit Card</h3>
              <button
                onClick={() => {
                  setEditCard(null);
                  setErrors({});
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              // Validation logic
              const newErrors = {};

              if (!form.cardHolderName.trim()) {
                newErrors.cardHolderName = 'Cardholder name is required';
              } else if (form.cardHolderName.length < 2) {
                newErrors.cardHolderName = 'Name is too short';
              }

              const rawCardNumber = form.cardNumber.replace(/\s+/g, '');
              if (!rawCardNumber) {
                newErrors.cardNumber = 'Card number is required';
              } else if (!/^\d{16}$/.test(rawCardNumber)) {
                newErrors.cardNumber = 'Invalid card number (16 digits required)';
              }

              if (!form.expiryDate) {
                newErrors.expiryDate = 'Expiry date is required';
              } else {
                const [month, year] = form.expiryDate.split('/');
                const currentYear = new Date().getFullYear() % 100;
                const currentMonth = new Date().getMonth() + 1;

                if (!month || !year || month.length !== 2 || year.length !== 2) {
                  newErrors.expiryDate = 'Invalid format (MM/YY)';
                } else if (parseInt(month) < 1 || parseInt(month) > 12) {
                  newErrors.expiryDate = 'Invalid month (1-12)';
                } else if (
                  parseInt(year) < currentYear ||
                  (parseInt(year) === currentYear && parseInt(month) < currentMonth)
                ) {
                  newErrors.expiryDate = 'Card has expired';
                }
              }

              if (!form.cvv) {
                newErrors.cvv = 'CVV is required';
              } else if (!/^\d{3,4}$/.test(form.cvv)) {
                newErrors.cvv = 'Invalid CVV (3-4 digits)';
              }

              if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
              } else {
                handleUpdate();
              }
            }}>
              <div className="space-y-4">
                {/* Cardholder Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder Name
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.cardHolderName}
                    onChange={e => {
                      setForm({ ...form, cardHolderName: e.target.value });
                      if (errors.cardHolderName) {
                        setErrors({ ...errors, cardHolderName: '' });
                      }
                    }}
                    className={`border ${errors.cardHolderName ? 'border-rose-500' : 'border-gray-300'} p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                    placeholder="John Doe"
                  />
                  {errors.cardHolderName && (
                    <p className="mt-1 text-sm text-rose-600">{errors.cardHolderName}</p>
                  )}
                </div>

                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.cardNumber}
                    onChange={e => {
                      const value = e.target.value.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
                      setForm({ ...form, cardNumber: value });
                      if (errors.cardNumber) {
                        setErrors({ ...errors, cardNumber: '' });
                      }
                    }}
                    maxLength={19}
                    className={`border ${errors.cardNumber ? 'border-rose-500' : 'border-gray-300'} p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                    placeholder="4242 4242 4242 4242"
                  />
                  {errors.cardNumber && (
                    <p className="mt-1 text-sm text-rose-600">{errors.cardNumber}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Expiry Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                      <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.expiryDate}
                      onChange={e => {
                        let value = e.target.value.replace(/\D/g, '');
                        if (value.length > 2) {
                          value = value.substring(0, 2) + '/' + value.substring(2, 4);
                        }
                        setForm({ ...form, expiryDate: value });
                        if (errors.expiryDate) {
                          setErrors({ ...errors, expiryDate: '' });
                        }
                      }}
                      maxLength={5}
                      className={`border ${errors.expiryDate ? 'border-rose-500' : 'border-gray-300'} p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                      placeholder="MM/YY"
                    />
                    {errors.expiryDate && (
                      <p className="mt-1 text-sm text-rose-600">{errors.expiryDate}</p>
                    )}
                  </div>

                  {/* CVV */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                      <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.cvv}
                      onChange={e => {
                        const value = e.target.value.replace(/\D/g, '').substring(0, 4);
                        setForm({ ...form, cvv: value });
                        if (errors.cvv) {
                          setErrors({ ...errors, cvv: '' });
                        }
                      }}
                      maxLength={4}
                      className={`border ${errors.cvv ? 'border-rose-500' : 'border-gray-300'} p-3 w-full rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors`}
                      placeholder="123"
                    />
                    {errors.cvv && (
                      <p className="mt-1 text-sm text-rose-600">{errors.cvv}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setEditCard(null);
                      setErrors({});
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg shadow hover:from-indigo-600 hover:to-blue-700 transition-all disabled:opacity-70 flex items-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating...
                      </>
                    ) : 'Update Card'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

        {/* Delete Confirmation Modal */}
        {isConfirmOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Confirm Deletion</h3>
                <button
                  onClick={() => setIsConfirmOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-gray-700 mb-6">Are you sure you want to delete this card? This action cannot be undone.</p>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsConfirmOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={isLoading}
                  className="px-6 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg shadow hover:from-rose-600 hover:to-pink-700 transition-all disabled:opacity-70 flex items-center"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </>
                  ) : 'Delete Card'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCardManagement;
