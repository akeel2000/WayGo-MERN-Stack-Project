// Pages/shajeeh/CartPage.jsx
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
    <div className="pt-24 p-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, index) => {
            const rent = item.rentPerDay ?? item.price ?? 0;
            const days = item.days ?? 1;
            const subtotal = rent * days;

            return (
              <div key={index} className="border p-4 rounded shadow">
                <h3>{item.name}</h3>
                <p>Type: {item.type}</p>
                <p>Rs {rent} × {days} Days = <b>Rs {subtotal}</b></p>

                <div className="flex gap-2 mt-2">
                  <button onClick={() => updateItem(item.id, days + 1)}>+1 Day</button>
                  {days > 1 && (
                    <button onClick={() => updateItem(item.id, days - 1)}>-1 Day</button>
                  )}
                  <button onClick={() => removeItem(item.id)} className="text-red-500">Remove</button>
                </div>
              </div>
            );
          })}

          <div className="text-right text-xl font-bold">Total: Rs {total}</div>

          <button
            onClick={() => navigate('/card-entry')}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Next: Card or Cash Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
