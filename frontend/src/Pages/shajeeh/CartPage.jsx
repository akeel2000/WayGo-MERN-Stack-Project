import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const {
    cartItems,
    updateItem,
    removeItem,
    clearCart
  } = useContext(CartContext);
  const navigate = useNavigate();

  // Safer total calculation with fallbacks
  const total = cartItems.reduce((sum, item) => {
    const rent = item.rentPerDay ?? item.price ?? 0;
    const days = item.days ?? 1;
    return sum + rent * days;
  }, 0);

  const handleConfirmBooking = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          items: cartItems,
          total,
        }),
      });

      if (!response.ok) throw new Error('Booking failed');
      clearCart();
      navigate('/success');
    } catch (err) {
      console.error(err);
      alert('Failed to confirm booking. Try again.');
    }
  };

  return (
    <div className="pt-24 p-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, index) => {
            const rent = item.rentPerDay ?? item.price ?? 0;
            const days = item.days ?? 1;
            const subtotal = rent * days;

            return (
              <div key={index} className="border rounded p-4 shadow">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p>Type: {item.type}</p>
                <p>Rent Per Day: Rs {rent}</p>
                <p>Days: {days}</p>
                <p className="font-medium">Subtotal: Rs {subtotal}</p>

                {/* Rent Days Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                    onClick={() => updateItem(item.id, days + 1)}
                  >
                    +1 Day
                  </button>
                  {days > 1 && (
                    <button
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                      onClick={() => updateItem(item.id, days - 1)}
                    >
                      -1 Day
                    </button>
                  )}
                  <button
                    className="ml-auto text-red-600 underline"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}

          {/* Total + Confirm Button */}
          <div className="text-xl font-bold text-right">
            Total: Rs {total}
          </div>

          <button
            onClick={handleConfirmBooking}
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
          >
            Confirm & Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
