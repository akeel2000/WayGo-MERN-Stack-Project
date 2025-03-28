import React, { useState, useEffect, useCallback, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

// Render stars
function renderStars(rating, className = "") {
  const rounded = Math.round(rating);
  return (
    <span className={`text-yellow-400 ${className}`}>
      {"★".repeat(rounded) + "☆".repeat(5 - rounded)}
    </span>
  );
}

// Star rating input
function StarRatingInput({ value, onChange }) {
  return (
    <div className="flex items-center space-x-1 text-2xl text-yellow-400">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="focus:outline-none"
          onClick={() => onChange(star)}
        >
          {star <= value ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}

function RentalVehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [vehicle, setVehicle] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 1, comment: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Fixed API endpoint paths here
  const fetchVehicle = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/rentalVehicles/${id}`);
      if (!res.ok) throw new Error("Failed to fetch vehicle");
      const data = await res.json();
      setVehicle(data);
    } catch (err) {
      setError("Error fetching vehicle: " + err.message);
    }
  }, [id]);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/rentalVehicles/${id}/reviews`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      setError("Error fetching reviews: " + err.message);
    }
  }, [id]);

  useEffect(() => {
    fetchVehicle();
    fetchReviews();
  }, [fetchVehicle, fetchReviews]);

  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) ratingCounts[r.rating - 1]++;
  });

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/rentalVehicles/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(reviewForm),
      });
      if (!res.ok) throw new Error("Failed to submit review");
      setMessage("Review submitted!");
      setReviewForm({ rating: 1, comment: "" });
      fetchReviews();
    } catch (err) {
      setError("Error submitting review: " + err.message);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: vehicle._id,
      name: `${vehicle.make} ${vehicle.model}`,
      price: vehicle.dailyRate,
      type: "vehicle",
      quantity: 1,
    };
    addToCart(cartItem);
    navigate("/cart");
  };

  return (
    <div className="pt-24 p-4 max-w-4xl mx-auto">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {vehicle ? (
        <>
          <h1 className="text-3xl font-bold mb-2">{vehicle.make} {vehicle.model}</h1>
          <p className="mb-2"><strong>Year:</strong> {vehicle.year}</p>
          <p className="mb-2"><strong>Daily Rate:</strong> Rs {vehicle.dailyRate}</p>
          <p className="mb-2"><strong>Availability:</strong> {vehicle.available ? "Yes" : "No"}</p>
          <p className="mb-2"><strong>Description:</strong> {vehicle.description || "No description available"}</p>

          {vehicle.images?.length > 0 ? (
            <img
              src={`http://localhost:5000${vehicle.images[0].url}`}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="w-full h-64 object-cover mb-4 rounded"
            />
          ) : (
            <img
              src="https://via.placeholder.com/500x300.png?text=No+Image+Available"
              alt="No Image"
              className="w-full h-64 object-cover mb-4 rounded"
            />
          )}

          {/* Ratings Summary */}
          <div className="bg-white p-4 shadow rounded mb-6">
            <h2 className="text-xl font-bold mb-2">Ratings Summary</h2>
            <div className="flex flex-col space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = ratingCounts[star - 1];
                const percentage = reviews.length ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={star} className="flex items-center">
                    <span className="w-10 text-sm">{star}★</span>
                    <div className="flex-1 bg-gray-200 h-2 mx-2 rounded relative">
                      <div
                        style={{ width: `${percentage}%` }}
                        className="bg-yellow-400 h-2 rounded absolute top-0 left-0"
                      ></div>
                    </div>
                    <span className="w-6 text-sm">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews Section */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Reviews</h2>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev._id} className="border p-4 rounded shadow">
                    <div className="flex justify-between">
                      <strong>{rev.name}</strong>
                      {renderStars(rev.rating)}
                    </div>
                    <p>{rev.comment}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(rev.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>

          {/* Add Review */}
          <form onSubmit={handleReviewSubmit} className="mt-6 space-y-4">
            <h2 className="text-2xl font-bold">Leave a Review</h2>
            {message && <p className="text-green-600">{message}</p>}
            <div>
              <label>Rating:</label>
              <StarRatingInput
                value={reviewForm.rating}
                onChange={(val) => setReviewForm({ ...reviewForm, rating: val })}
              />
            </div>
            <div>
              <label>Comment:</label>
              <textarea
                required
                className="w-full border p-2 rounded"
                value={reviewForm.comment}
                onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
              />
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Submit Review
            </button>
          </form>

          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-2 rounded mt-6 hover:bg-blue-700"
          >
            Book Now
          </button>
        </>
      ) : (
        <p>Loading vehicle details...</p>
      )}
    </div>
  );
}

export default RentalVehicleDetails;
