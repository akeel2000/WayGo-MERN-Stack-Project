// src/Pages/GuideDetails.js
import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

/** Renders a 5-star display for a numeric rating. */
function renderStars(rating, className = "") {
  const rounded = Math.round(rating);
  const totalStars = 5;
  const filled = "★".repeat(rounded);
  const empty = "☆".repeat(totalStars - rounded);
  return (
    <span className={`text-yellow-400 ${className}`}>
      {filled + empty}
    </span>
  );
}

/** A simple star-based rating input component for the review form. */
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

  // Count how many reviews for each rating 1..5 (for the bar chart)
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((rev) => {
    const r = rev.rating;
    if (r >= 1 && r <= 5) {
      ratingCounts[r - 1]++;
    }
  });

  // Handle review form submission
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
    <div className=" pt-24 p-4 max-w-4xl mx-auto">
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {guide ? (
        <div className="space-y-6">
          {/* GUIDE HEADER */}
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
          </div>

          {/* RATING & DISTRIBUTION */}
          <div className="bg-white rounded shadow p-4 flex flex-col md:flex-row items-center md:items-start md:space-x-6">
            {/* Big rating display */}
            <div className="text-center mb-4 md:mb-0">
              <p className="text-5xl font-bold text-yellow-500">
                {guide.rating.toFixed(1)}
              </p>
              <div className="mt-1">{renderStars(guide.rating, "text-2xl")}</div>
              <p className="text-sm text-gray-500 mt-1">
                ({reviews.length} Review{reviews.length !== 1 ? "s" : ""})
              </p>
            </div>

            {/* Star distribution bars */}
            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = ratingCounts[star - 1];
                const percentage =
                  reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={star} className="flex items-center mb-1">
                    <span className="w-8 text-sm">{star} star</span>
                    <div className="flex-1 bg-gray-200 h-2 mx-2 relative rounded">
                      <div
                        style={{ width: `${percentage}%` }}
                        className="absolute top-0 left-0 h-2 bg-yellow-400 rounded"
                      ></div>
                    </div>
                    <span className="text-sm w-6 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* LIST OF REVIEWS */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Reviews</h2>
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev._id}
                    className="border p-4 rounded shadow hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold">{rev.name}</p>
                      <div>{renderStars(rev.rating)}</div>
                    </div>
                    <p className="text-gray-700">{rev.comment}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(rev.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>

          {/* ADD A REVIEW FORM */}
          <div>
            <hr className="my-4" />
            <h2 className="text-2xl font-bold mb-2">Add a Review</h2>
            {message && <p className="text-green-500 mb-2">{message}</p>}
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block mb-1">Rating (1-5):</label>
                <StarRatingInput
                  value={reviewForm.rating}
                  onChange={(val) =>
                    setReviewForm({ ...reviewForm, rating: val })
                  }
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
        </div>
      ) : (
        <p>Loading guide details...</p>
      )}
    </div>
  );
}

export default GuideDetails;
