import React, { useState, useEffect, useCallback, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from '../context/CartContext';

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

function GuideDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [guide, setGuide] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  const fetchGuide = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/guides/${id}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch guide");
      const data = await res.json();
      setGuide(data);
    } catch (err) {
      console.error(err);
      setError("Error fetching guide: " + err.message);
    }
  }, [id]);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/guides/${id}/reviews`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
      setError("Error fetching reviews: " + err.message);
    }
  }, [id]);

  useEffect(() => {
    fetchGuide();
    fetchReviews();
  }, [fetchGuide, fetchReviews]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/guides/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(reviewForm),
      });
      if (!res.ok) throw new Error("Failed to add review");
      setMessage("Review submitted successfully!");
      setReviewForm({ rating: 5, comment: "" });
      fetchReviews();
    } catch (err) {
      console.error(err);
      setError("Error adding review: " + err.message);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: guide._id,
      name: guide.name,
      price: guide.rentPerDay,
      type: 'guide',
      quantity: 1,
    };
    addToCart(cartItem);
    navigate("/cart");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((rev) => {
    if (rev.rating >= 1 && rev.rating <= 5) ratingCounts[rev.rating - 1]++;
  });

  if (!guide) {
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
        Back to Guides
      </button>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Guide Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              {guide.name}
            </h1>
            <p className="text-gray-600">{guide.location}</p>
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

      {/* Guide Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-video">
            {guide.images?.length > 0 ? (
              <img
                src={`http://localhost:5000${guide.images[activeImage].url}`}
                alt={guide.name}
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
          </div>
          {guide.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {guide.images.map((img, index) => (
                <button
                  key={index}
                  className={`relative rounded-lg overflow-hidden aspect-square ${activeImage === index ? "ring-2 ring-amber-500" : ""
                    }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={`http://localhost:5000${img.url}`}
                    alt={`${guide.name} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Guide Details */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Details</h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${guide.available
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-rose-100 text-rose-800"
                  }`}
              >
                {guide.available ? "Available" : "Not Available"}
              </span>
            </div>

            <p className="text-gray-600 mb-6">{guide.about}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Price per Day</p>
                <p className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  Rs {guide.rentPerDay}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Experience</p>
                <p className="font-medium">{guide.experience} years</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{guide.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Languages</p>
                <p className="font-medium">{guide.languages.join(", ")}</p>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!guide.available}
              className={`w-full py-3 px-6 rounded-xl font-medium text-white transition-all duration-300 ${guide.available
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-lg"
                  : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              {guide.available ? "Book Now" : "Not Available"}
            </button>
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
              placeholder="Share your experience with this guide..."
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

export default GuideDetails;
