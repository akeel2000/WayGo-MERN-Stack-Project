import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, updateItem, removeItem } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => {
    const rent = item.rentPerDay ?? item.price ?? 0;
    const days = item.days ?? 1;
    return sum + rent * days;
  }, 0);

  return (
    <div className="pt-24 p-4 max-w-7xl mx-auto min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Your Cart</h1>
          <p className="text-gray-500 mt-2">Review your selected rentals</p>
        </div>
        {cartItems.length > 0 && (
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-amber-700 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Continue Shopping
          </button>
        )}
      </div>

      {/* Empty State */}
      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
          <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-gray-200 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-medium text-gray-800">Your cart is empty</h3>
          <p className="mt-2 text-gray-500">Add items to get started with your rental</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all"
          >
            Browse Rentals
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items List */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Your Items ({cartItems.length})</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {cartItems.map((item) => {
                const rent = item.rentPerDay ?? item.price ?? 0;
                const days = item.days ?? 1;
                const subtotal = rent * days;

                return (
                  <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {item.image && (
                        <div className="flex-shrink-0 w-full sm:w-32 h-32 rounded-lg overflow-hidden">
                          <img
                            className="w-full h-full object-cover"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.type}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>

                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 w-fit">
                            <button
                              onClick={() => updateItem(item.id, days - 1)}
                              disabled={days <= 1}
                              className={`p-1 ${days <= 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-800'}`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <span className="mx-2 font-medium">{days} days</span>
                            <button
                              onClick={() => updateItem(item.id, days + 1)}
                              className="p-1 text-blue-600 hover:text-blue-800"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-gray-500">Rs {rent} per day</p>
                            <p className="text-lg font-semibold text-gray-900">Rs {subtotal.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => {
                const rent = item.rentPerDay ?? item.price ?? 0;
                const days = item.days ?? 1;
                const subtotal = rent * days;

                return (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      {item.image && (
                        <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden">
                          <img
                            className="w-full h-full object-cover"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-500">{days} day{days > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium">Rs {subtotal.toFixed(2)}</p>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-gray-700">Subtotal</span>
                <span className="text-base font-medium">Rs {total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/card-entry')}
              className="w-full py-3 px-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg font-medium shadow-md hover:from-amber-600 hover:to-amber-700 transition-all flex items-center justify-center gap-2"
            >
              Proceed to Payment
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure payment processing
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
