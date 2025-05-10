import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaArrowLeft, FaShoppingBag, FaLock, FaArrowRight, FaPlus, FaMinus, FaExclamationCircle } from 'react-icons/fa';

const CartPage = () => {
  const { cartItems, updateItem, removeItem } = useContext(CartContext);
  const navigate = useNavigate();
  const [validationError, setValidationError] = useState(null);

  const total = cartItems.reduce((sum, item) => {
    const rent = item.rentPerDay ?? item.price ?? 0;
    const days = item.days ?? 1;
    return sum + rent * days;
  }, 0);

  const validateCart = () => {
    // Check if cart is empty
    if (cartItems.length === 0) {
      setValidationError('Your cart is empty. Please add items before proceeding to checkout.');
      return false;
    }

    // Validate each item in the cart
    for (const item of cartItems) {
      // Check if item has valid price/rent
      if (!item.price && !item.rentPerDay) {
        setValidationError(`Invalid pricing for ${item.name}. Please remove and re-add this item.`);
        return false;
      }

      // Check if rental days are valid
      if (item.days <= 0) {
        setValidationError(`Invalid rental duration for ${item.name}. Please set at least 1 day.`);
        return false;
      }

      // Check if item has all required fields
      if (!item.name || !item.type) {
        setValidationError(`Incomplete information for ${item.name || 'an item'}. Please remove and re-add this item.`);
        return false;
      }
    }

    setValidationError(null);
    return true;
  };

  const handleProceedToPayment = () => {
    if (validateCart()) {
      navigate('/card-entry');
    }
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
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-amber-700 hover:text-amber-900 transition-colors"
            >
              <FaArrowLeft className="mr-2" /> Continue Shopping
            </button>

            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Cart Summary
            </h2>
          </div>

          {/* Validation Error Message */}
          {validationError && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <div className="flex items-center">
                <FaExclamationCircle className="text-red-500 mr-3" />
                <div>
                  <p className="text-red-700 font-medium">{validationError}</p>
                </div>
              </div>
            </div>
          )}

          {cartItems.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-amber-200">
              <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-amber-100 rounded-full">
                <FaShoppingBag className="text-3xl text-amber-600" />
              </div>
              <h3 className="mt-4 text-xl font-medium text-amber-800">Your cart is empty</h3>
              <p className="mt-2 text-amber-600">Add items to get started with your rental</p>
              <button
                onClick={() => navigate('/')}
                className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all"
              >
                Browse Rentals
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items List */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => {
                  const rent = item.rentPerDay ?? item.price ?? 0;
                  const days = item.days ?? 1;
                  const subtotal = rent * days;
                  const hasError = (!item.price && !item.rentPerDay) || item.days <= 0 || !item.name || !item.type;

                  return (
                    <div
                      key={item.id}
                      className={`border ${hasError ? 'border-red-300 bg-red-50' : 'border-amber-200'} p-6 rounded-xl bg-white hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6`}
                    >
                      {item.image && (
                        <div className="flex-shrink-0 w-full sm:w-32 h-32 rounded-lg overflow-hidden">
                          <img
                            className="w-full h-full object-cover"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                      )}

                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold text-amber-900 mb-1">{item.name || 'Unnamed Item'}</h3>
                            <p className="text-amber-600">{item.type || 'No type specified'}</p>
                            {hasError && (
                              <p className="text-sm text-red-600 mt-1 flex items-center">
                                <FaExclamationCircle className="mr-1" /> This item needs attention
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors p-1"
                            title="Remove Item"
                          >
                            <FaTrash className="text-xl" />
                          </button>
                        </div>

                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className={`flex items-center ${item.days <= 0 ? 'bg-red-100' : 'bg-amber-100'} rounded-full px-3 py-1 w-fit`}>
                            <button
                              onClick={() => updateItem(item.id, days - 1)}
                              disabled={days <= 1}
                              className={`p-1 ${days <= 1 ? 'text-gray-400 cursor-not-allowed' : 'text-amber-700 hover:text-amber-900'}`}
                            >
                              <FaMinus className="h-4 w-4" />
                            </button>
                            <span className={`mx-3 font-medium ${item.days <= 0 ? 'text-red-700' : ''}`}>
                              {days} Day{days > 1 ? 's' : ''}
                            </span>
                            <button
                              onClick={() => updateItem(item.id, days + 1)}
                              className="p-1 text-amber-700 hover:text-amber-900"
                            >
                              <FaPlus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-amber-600">
                              Rs.{rent > 0 ? rent : <span className="text-red-600">Invalid price</span>} per day
                            </p>
                            <p className="text-lg font-bold text-amber-900">
                              Rs.{subtotal > 0 ? subtotal.toFixed(2) : <span className="text-red-600">Invalid total</span>}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="border border-amber-200 p-6 rounded-xl bg-white sticky top-4">
                  <h2 className="text-xl font-bold text-amber-900 mb-6">Order Summary</h2>

                  <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-2">
                    {cartItems.map((item) => {
                      const rent = item.rentPerDay ?? item.price ?? 0;
                      const days = item.days ?? 1;
                      const subtotal = rent * days;

                      return (
                        <div key={item.id} className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            {item.image && (
                              <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden border border-amber-200">
                                <img
                                  className="w-full h-full object-cover"
                                  src={item.image}
                                  alt={item.name}
                                />
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-medium text-amber-800 line-clamp-1">{item.name}</p>
                              <p className="text-xs text-amber-600">{days} Day{days > 1 ? 's' : ''}</p>
                            </div>
                          </div>
                          <p className="text-sm font-medium">Rs.{subtotal.toFixed(2)}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-amber-200 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-medium text-amber-800">Total</span>
                      <span className="text-lg font-bold text-amber-900">Rs.{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleProceedToPayment}
                    disabled={validationError !== null}
                    className={`w-full py-3 px-6 text-white rounded-lg font-medium shadow transition-all flex items-center justify-center gap-2 ${
                      validationError
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                    }`}
                  >
                    Proceed to Payment
                    <FaArrowRight />
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-amber-600">
                    <FaLock className="text-amber-500" />
                    Secure payment processing
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CartPage;
