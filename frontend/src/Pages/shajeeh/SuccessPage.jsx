// src/Pages/SuccessPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div className="pt-24 p-4 text-center max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-green-600 mb-4">Booking Successful!</h2>
      <p className="text-lg mb-6">Thank you for your booking. We will contact you soon with more details.</p>

      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default SuccessPage;
