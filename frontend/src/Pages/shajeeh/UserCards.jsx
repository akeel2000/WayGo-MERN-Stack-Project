import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaTrash, FaPlus, FaUser } from 'react-icons/fa';

const UserCards = () => {
  const [cards, setCards] = useState([]);
  const [form, setForm] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });
  const [errors, setErrors] = useState({
    cardHolderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCards = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/cards', { withCredentials: true });
      setCards(res.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
      toast.error("Failed to load cards");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      cardHolderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: ""
    };

    if (!form.cardHolderName.trim()) {
      newErrors.cardHolderName = "Cardholder name is required";
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(form.cardHolderName)) {
      newErrors.cardHolderName = "Only letters and spaces allowed";
      isValid = false;
    }

    const cardNumberDigits = form.cardNumber.replace(/\s/g, "");
    if (!cardNumberDigits) {
      newErrors.cardNumber = "Card number is required";
      isValid = false;
    } else if (cardNumberDigits.length !== 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
      isValid = false;
    } else if (!/^\d+$/.test(cardNumberDigits)) {
      newErrors.cardNumber = "Only numbers allowed";
      isValid = false;
    }

    if (!form.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
      isValid = false;
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiryDate)) {
      newErrors.expiryDate = "Format must be MM/YY";
      isValid = false;
    } else {
      const [month, year] = form.expiryDate.split('/');
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (parseInt(year) < currentYear ||
          (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        newErrors.expiryDate = "Card has expired";
        isValid = false;
      }
    }

    if (!form.cvv) {
      newErrors.cvv = "CVV is required";
      isValid = false;
    } else if (form.cvv.length !== 3) {
      newErrors.cvv = "CVV must be 3 digits";
      isValid = false;
    } else if (!/^\d+$/.test(form.cvv)) {
      newErrors.cvv = "Only numbers allowed";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await axios.post('http://localhost:5000/api/cards', form, { withCredentials: true });
      setForm({ cardHolderName: "", cardNumber: "", expiryDate: "", cvv: "" });
      setErrors({ cardHolderName: "", cardNumber: "", expiryDate: "", cvv: "" });
      fetchCards();
      setIsModalOpen(false);
      toast.success("Card added successfully!");
    } catch (error) {
      console.error("Error saving card:", error);
      toast.error("Failed to save card");
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
        toast.success("Card deleted successfully!");
      } catch (error) {
        console.error("Error deleting card:", error);
        toast.error("Failed to delete card");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-amber-50 text-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center text-center py-24 px-4 bg-gradient-to-r from-amber-400 to-orange-500">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md">
            Your Payment Cards
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto mb-8">
            Securely manage your payment methods
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Saved Cards
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-3 rounded-lg shadow-md hover:from-purple-600 hover:to-purple-700 transition-all"
              title="Add New Card"
            >
              <FaPlus className="text-xl" />
            </button>
          </div>

          {/* Add Card Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-amber-900">Add New Card</h3>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setErrors({ cardHolderName: "", cardNumber: "", expiryDate: "", cvv: "" });
                    }}
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
                        if (/^[a-zA-Z\s]*$/.test(value)) {
                          setForm({ ...form, cardHolderName: value });
                          setErrors({ ...errors, cardHolderName: "" });
                        }
                      }}
                      className={`border ${errors.cardHolderName ? "border-red-500" : "border-amber-300"} p-3 w-full rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                    />
                    {errors.cardHolderName && (
                      <p className="text-sm text-red-500 mt-1">{errors.cardHolderName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-amber-800 mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={form.cardNumber}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        if (value.length > 16) value = value.slice(0, 16);
                        const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
                        setForm({ ...form, cardNumber: formattedValue });
                        setErrors({ ...errors, cardNumber: "" });
                      }}
                      className={`border ${errors.cardNumber ? "border-red-500" : "border-amber-300"} p-3 w-full rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                    />
                    {errors.cardNumber && (
                      <p className="text-sm text-red-500 mt-1">{errors.cardNumber}</p>
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
                          let value = e.target.value.replace(/\D/g, "");
                          if (value.length > 4) value = value.slice(0, 4);
                          if (value.length >= 3) value = `${value.slice(0, 2)}/${value.slice(2)}`;
                          setForm({ ...form, expiryDate: value });
                          setErrors({ ...errors, expiryDate: "" });
                        }}
                        className={`border ${errors.expiryDate ? "border-red-500" : "border-amber-300"} p-3 w-full rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                      />
                      {errors.expiryDate && (
                        <p className="text-sm text-red-500 mt-1">{errors.expiryDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-amber-800 mb-1">CVV</label>
                      <input
                        type="password"
                        placeholder="123"
                        value={form.cvv}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, "");
                          if (value.length > 3) value = value.slice(0, 3);
                          setForm({ ...form, cvv: value });
                          setErrors({ ...errors, cvv: "" });
                        }}
                        className={`border ${errors.cvv ? "border-red-500" : "border-amber-300"} p-3 w-full rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500`}
                      />
                      {errors.cvv && (
                        <p className="text-sm text-red-500 mt-1">{errors.cvv}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setIsModalOpen(false);
                        setErrors({ cardHolderName: "", cardNumber: "", expiryDate: "", cvv: "" });
                      }}
                      className="px-4 py-2 border border-amber-300 text-amber-800 rounded-lg hover:bg-amber-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-lg shadow hover:from-purple-600 hover:to-purple-700 transition-all disabled:opacity-70"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cards.map((card) => (
              <div
                key={card._id}
                className="border border-amber-200 p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow hover:border-amber-300 relative"
              >
                <div className="flex items-center mb-3">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2">
                  <FaUser className="text-sm" />
                </div>
                <h3 className="font-semibold text-sm text-amber-900 truncate">{card.cardHolderName}</h3>
                </div>

                <div className="space-y-2 text-sm">
                <p className="text-gray-700 truncate">
                  <span className="text-amber-800 font-medium">Card No:</span>
                  <span className="ml-1 font-mono tracking-wider">•••• {card.cardNumber.slice(-4)}</span>
                </p>
                <p className="text-gray-700">
                  <span className="text-amber-800 font-medium">Expiry:</span>
                  <span className="ml-1">{card.expiryDate}</span>
                </p>
                </div>

                <div className="mt-4 flex justify-end">
                <button
                  onClick={() => handleDelete(card._id)}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white p-2 rounded-md hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-70"
                  title="Delete Card"
                >
                  <FaTrash className="text-sm" />
                </button>
                </div>
              </div>
              ))}
            </div>
            )}
          </div>
      </section>
    </div>
  );
};

export default UserCards;
