import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

// ⭐ Star rendering
function renderStars(rating, className = "") {
  const rounded = Math.round(rating);
  return (
    <span className={`text-yellow-400 ${className}`}>
      {"★".repeat(rounded) + "☆".repeat(5 - rounded)}
    </span>
  );
}

// ⭐ Star rating input component
function StarRatingInput({ value, onChange }) {
  return (
    <div className="flex items-center space-x-1 text-2xl text-yellow-400">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => onChange(star)}>
          {star <= value ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}

function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [hotel, setHotel] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [reviewForm, setReviewForm] = useState({ rating: 1, comment: "" });
  const [message, setMessage] = useState("");

  const fetchHotel = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/hotels/${id}`);
      if (!res.ok) throw new Error("Failed to fetch hotel");
      const data = await res.json();
      setHotel(data);
    } catch (err) {
      setError("Error fetching hotel: " + err.message);
    }
  }, [id]);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/hotels/${id}/reviews`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      setError("Error fetching reviews: " + err.message);
    }
  }, [id]);

  useEffect(() => {
    fetchHotel();
    fetchReviews();
  }, [fetchHotel, fetchReviews]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/hotels/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(reviewForm),
      });
      if (!res.ok) throw new Error("Review submission failed");
      setReviewForm({ rating: 1, comment: "" });
      setMessage("Review submitted successfully!");
      fetchReviews();
    } catch (err) {
      setError("Error submitting review: " + err.message);
    }
  };

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

  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((rev) => {
    const r = rev.rating;
    if (r >= 1 && r <= 5) ratingCounts[r - 1]++;
  });

  return (
    <div className="pt-24 p-4 max-w-4xl mx-auto">
      {error && <p className="text-red-500">{error}</p>}

      {hotel ? (
        <>
          <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
          <p className="mb-2"><strong>Location:</strong> {hotel.location}</p>
          <p className="mb-2"><strong>Available Rooms:</strong> {hotel.availableRooms}</p>
          <p className="mb-2"><strong>Rent per Night:</strong> Rs {hotel.rentPerNight}</p>
          <p className="mb-4"><strong>Facilities:</strong> {hotel.facilities.join(", ")}</p>

          {hotel.images?.[0] ? (
            <img
              src={`http://localhost:5000${hotel.images[0].url}`}
              alt={hotel.name}
              className="w-full h-64 object-cover rounded mb-4"
            />
          ) : (
            <img
              src="https://via.placeholder.com/500x300.png?text=No+Image"
              className="w-full h-64 object-cover rounded mb-4"
              alt="No Image"
            />
          )}

          <p className="mb-6 text-gray-700">{hotel.description}</p>

          {/* Ratings Summary */}
          <div className="bg-white p-4 shadow rounded mb-6">
            <h2 className="text-xl font-bold mb-2">Ratings Summary</h2>
            <div className="flex">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = ratingCounts[star - 1];
                const percent = reviews.length ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={star} className="flex items-center w-full mb-2">
                    <span className="w-10 text-sm">{star}★</span>
                    <div className="flex-1 bg-gray-200 h-2 mx-2 relative rounded">
                      <div
                        className="absolute left-0 bg-yellow-400 h-2 rounded"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <span className="text-sm w-6">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Reviews</h2>
            {reviews.length > 0 ? (
              reviews.map((r) => (
                <div key={r._id} className="border p-4 rounded shadow mb-2">
                  <div className="flex justify-between">
                    <strong>{r.name}</strong>
                    {renderStars(r.rating)}
                  </div>
                  <p>{r.comment}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(r.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>

          {/* Add a Review */}
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <h2 className="text-xl font-bold">Add a Review</h2>
            {message && <p className="text-green-600">{message}</p>}
            <StarRatingInput
              value={reviewForm.rating}
              onChange={(val) => setReviewForm({ ...reviewForm, rating: val })}
            />
            <textarea
              required
              placeholder="Write your review..."
              value={reviewForm.comment}
              onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Submit Review
            </button>
          </form>

          <button
            onClick={handleBookNow}
            className="bg-blue-600 text-white px-6 py-2 rounded mt-6 hover:bg-blue-700"
          >
            Book Now
          </button>
        </>
      ) : (
        <p>Loading hotel details...</p>
      )}
    </div>
  );
}

export default HotelDetails;
