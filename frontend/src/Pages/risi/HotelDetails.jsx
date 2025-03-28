import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from '../../context/CartContext';


function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [hotel, setHotel] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/hotels/${id}`);
        if (!res.ok) throw new Error("Failed to fetch hotel");
        const data = await res.json();
        setHotel(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchHotel();
  }, [id]);

  const handleBookNow = () => {
    const cartItem = {
      id: hotel._id,
      name: hotel.name,
      price: hotel.rentPerNight,
      type: "hotel",
      quantity: 1,
    };
    addToCart(cartItem);
    navigate("/cart");
  };

  if (!hotel) {
    return <div className="pt-24 p-4">Loading hotel...</div>;
  }

  return (
    <div className="pt-24 p-4 max-w-4xl mx-auto">
      {error && <p className="text-red-500">{error}</p>}
      <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
      <p className="text-gray-600 mb-2">{hotel.location}</p>
      <p className="mb-4">{hotel.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {hotel.images?.length > 0 ? (
          hotel.images.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:5000${img.url}`}
              alt={`Hotel ${index + 1}`}
              className="w-full h-48 object-cover rounded"
            />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>

      <p>
        <strong>Available Rooms:</strong> {hotel.availableRooms}
      </p>
      <p className="my-2">
        <strong>Rent/Night:</strong>{" "}
        <span className="text-amber-600 font-bold">Rs{hotel.rentPerNight}</span>
      </p>
      <p className="mb-4">
        <strong>Facilities:</strong>{" "}
        {hotel.facilities?.length > 0 ? hotel.facilities.join(", ") : "None"}
      </p>

      <button
        onClick={handleBookNow}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Book Now
      </button>
    </div>
  );
}

export default HotelDetails;
