import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/cart/all');
        setBookings(res.data);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
      }
    };

    fetchBookings();
  }, []);

  const markAsPaid = async (id) => {
    await axios.patch(`http://localhost:5000/api/cart/mark-paid/${id}`);
    alert('Payment marked as completed!');
    window.location.reload();
  };

  return (
    <div className="pt-24 p-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">All Bookings (Admin)</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((b, i) => (
          <div key={i} className="border p-4 rounded mb-4 shadow bg-white">
            <h4 className="font-semibold mb-2">Booking #{i + 1}</h4>
            <p>User: {b.userId?.email || "Guest"}</p>
            <p>Date: {new Date(b.createdAt).toLocaleString()}</p>
            <p>Status: {b.paymentStatus === "Yes" ? "✅ Paid" : "❌ Unpaid"}</p>
            <ul className="list-disc pl-4 mt-2">
              {b.items.map((item, j) => (
                <li key={j}>
                  {item.type}: {item.name} - Rs {item.rentPerDay} x {item.days} days
                </li>
              ))}
            </ul>
            <p className="text-right mt-2 font-bold">Total: Rs {b.total}</p>
            {b.paymentStatus === "No" && (
              <button
                onClick={() => markAsPaid(b._id)}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Mark as Paid
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminBookings;
