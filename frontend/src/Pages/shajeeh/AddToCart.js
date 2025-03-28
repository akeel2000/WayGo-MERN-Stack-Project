import React, { useState } from "react";
import axios from "axios";

const AddToCart = ({ guideId }) => {
  const [rentalDays, setRentalDays] = useState(1);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post("/api/guides/add-to-cart", {
        guideId,
        rentalDays,
      });
      alert(response.data.message);
    } catch (err) {
      console.error(err);
      alert("Error adding guide to cart.");
    }
  };

  return (
    <div>
      <h2>Add Guide to Cart</h2>
      <input
        type="number"
        value={rentalDays}
        onChange={(e) => setRentalDays(e.target.value)}
        min="1"
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default AddToCart;
