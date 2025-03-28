import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewCart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("/api/guides/view-cart");
        setCart(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCart();
  }, []);

  if (!cart) return <div>Loading...</div>;

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.items.length > 0 ? (
        cart.items.map((item, index) => (
          <div key={index}>
            <h3>{item.guide.name}</h3>
            <p>Rental Days: {item.rentalDays}</p>
            <p>Total Price: ${item.totalPrice}</p>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default ViewCart;
