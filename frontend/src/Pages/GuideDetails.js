// src/Pages/GuideDetails.js
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

function GuideDetails() {
  const { id } = useParams();

  const [guide, setGuide] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 1, comment: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

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
      setMessage("Review added successfully!");
      setReviewForm({ rating: 1, comment: "" });
      fetchReviews();
    } catch (err) {
      console.error(err);
      setError("Error adding review: " + err.message);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {guide ? (
        <div>
          <h1 className="text-3xl font-bold mb-2">{guide.name}</h1>
          <p className="mb-2">{guide.about}</p>
          <p className="mb-2">
            <strong>Experience:</strong> {guide.experience} years
          </p>
          <p className="mb-2">
            <strong>Location:</strong> {guide.location}
          </p>
          <p className="mb-2">
            <strong>Languages:</strong> {guide.languages.join(", ")}
          </p>
          <p className="mb-2">
            <strong>Available:</strong> {guide.available ? "Yes" : "No"}
          </p>
          <p className="mb-2">
            <strong>Average Rating:</strong> {guide.rating.toFixed(1)}
          </p>

          <hr className="my-4" />

          <h2 className="text-2xl font-bold mb-2">Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((rev) => (
              <div key={rev._id} className="border p-4 rounded mb-2">
                <p className="font-bold">{rev.name}</p>
                <p>Rating: {rev.rating}/5</p>
                <p>{rev.comment}</p>
                <p className="text-xs text-gray-500">
                  {new Date(rev.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}

          <hr className="my-4" />

          <h2 className="text-2xl font-bold mb-2">Add a Review</h2>
          {message && <p className="text-green-500 mb-2">{message}</p>}
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Rating (1-5):</label>
              <StarRatingInput
                value={reviewForm.rating}
                onChange={(val) => setReviewForm({ ...reviewForm, rating: val })}
              />
            </div>
            <div>
              <label className="block mb-1">Comment:</label>
              <textarea
                name="comment"
                value={reviewForm.comment}
                onChange={(e) =>
                  setReviewForm({ ...reviewForm, comment: e.target.value })
                }
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Submit Review
            </button>
          </form>
        </div>
      ) : (
        <p>Loading guide details...</p>
      )}
    </div>
  );
}

/** A simple star-based rating input component. */
function StarRatingInput({ value, onChange }) {
  // "value" is the current rating (1..5)
  // "onChange" is a callback that sets the new rating
  const handleClick = (starValue) => {
    onChange(starValue);
  };

  return (
    <div className="flex items-center space-x-1 text-2xl text-yellow-400">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="focus:outline-none"
          onClick={() => handleClick(star)}
        >
          {star <= value ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}

export default GuideDetails;
