import React, { useState, useEffect, useCallback, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

function renderStars(rating, className = "") {
  const rounded = Math.round(rating);
  return (
    <span className={`text-amber-400 ${className}`}>
      {"★".repeat(rounded) + "☆".repeat(5 - rounded)}
    </span>
  );
}

function StarRatingInput({ value, onChange }) {
  return (
    <div className="flex items-center space-x-1 text-2xl text-amber-400">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="focus:outline-none hover:scale-110 transition-transform"
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
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [activeImage, setActiveImage] = useState(0);

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
      setMessage("Review submitted successfully!");
      setReviewForm({ rating: 5, comment: "" });
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

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (!vehicle) {
    return (
      <div className="pt-24 p-4 max-w-7xl mx-auto min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 p-4 max-w-7xl mx-auto min-h-screen">
      {/* Back Button */}
      <button
        onClick={handleGoBack}
        className="flex items-center text-gray-600 hover:text-amber-500 mb-6 transition-colors duration-200"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Vehicles
      </button>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Vehicle Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              {vehicle.make} {vehicle.model}
            </h1>
            <p className="text-gray-600">{vehicle.year}</p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            {renderStars(
              reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length || 0,
              "text-2xl mr-2"
            )}
            <span className="text-gray-600">
              ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-6"></div>
      </div>

      {/* Vehicle Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-video">
            {vehicle.images?.length > 0 ? (
              <img
                src={`http://localhost:5000${vehicle.images[activeImage].url}`}
                alt={`${vehicle.make} ${vehicle.model}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg
                  className="w-16 h-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>
          {vehicle.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {vehicle.images.map((img, index) => (
                <button
                  key={index}
                  className={`relative rounded-lg overflow-hidden aspect-square ${activeImage === index ? "ring-2 ring-amber-500" : ""
                    }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={`http://localhost:5000${img.url}`}
                    alt={`${vehicle.make} ${vehicle.model} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Vehicle Details */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Details</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${vehicle.available
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-rose-100 text-rose-800"
                  }`}
              >
                {vehicle.available ? "Available" : "Not Available"}
              </span>
            </div>

            <p className="text-gray-600 mb-6">
              {vehicle.description || "No description available."}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Daily Rate</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  Rs {vehicle.dailyRate}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{vehicle.type || "Standard"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Transmission</p>
                <p className="font-medium">{vehicle.transmission || "Automatic"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Seats</p>
                <p className="font-medium">{vehicle.seats || "4"}</p>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!vehicle.available}
              className={`w-full py-3 px-6 rounded-xl font-medium text-white transition-all duration-300 ${vehicle.available
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-lg"
                  : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              {vehicle.available ? "Book Now" : "Not Available"}
            </button>
          </div>

          {/* Features */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4">Features</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Air Conditioning",
                "Bluetooth",
                "Navigation",
                "Sunroof",
                "Heated Seats",
                "Backup Camera",
              ].map((feature) => (
                <div key={feature} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-amber-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ratings & Reviews */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Rating Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 md:w-1/3">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            <div className="flex items-center mb-6">
              <div className="text-5xl font-bold mr-4">
                {reviews.length
                  ? (
                    reviews.reduce((acc, curr) => acc + curr.rating, 0) /
                    reviews.length
                  ).toFixed(1)
                  : "0.0"}
              </div>
              <div>
                {renderStars(
                  reviews.reduce((acc, curr) => acc + curr.rating, 0) /
                  reviews.length || 0,
                  "text-2xl"
                )}
                <p className="text-gray-600 mt-1">
                  Based on {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = ratingCounts[star - 1];
                const percentage = reviews.length
                  ? (count / reviews.length) * 100
                  : 0;
                return (
                  <div key={star} className="flex items-center">
                    <span className="w-8">{star}★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2 overflow-hidden">
                      <div
                        className="h-full bg-amber-400"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="w-8 text-right text-sm text-gray-600">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews List */}
          <div className="flex-1">
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev._id}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold">{rev.name}</h3>
                      <div className="flex items-center">
                        {renderStars(rev.rating)}
                        <span className="ml-2 text-sm text-gray-500">
                          {new Date(rev.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600">{rev.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Review Form */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-12">
        <h2 className="text-2xl font-bold mb-6">Write a Review</h2>
        {message && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
            <p className="text-green-700">{message}</p>
          </div>
        )}
        <form onSubmit={handleReviewSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Rating
            </label>
            <StarRatingInput
              value={reviewForm.rating}
              onChange={(val) => setReviewForm({ ...reviewForm, rating: val })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-amber-500 focus:border-amber-500"
              value={reviewForm.comment}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, comment: e.target.value })
              }
              placeholder="Share your experience with this vehicle..."
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}

export default RentalVehicleDetails;
