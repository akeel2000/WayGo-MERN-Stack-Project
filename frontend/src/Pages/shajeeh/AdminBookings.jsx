import { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/cart/all');
        setBookings(res.data);
      } catch (err) {
        setError('Failed to fetch bookings');
        console.error('Failed to fetch bookings:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const markAsPaid = async (id) => {
    try {
      setIsLoading(true);
      await axios.patch(`http://localhost:5000/api/cart/mark-paid/${id}`);
      setBookings(bookings.map(b =>
        b._id === id ? {...b, paymentStatus: "Yes"} : b
      ));
    } catch (err) {
      setError('Failed to update payment status');
      console.error('Failed to mark as paid:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateReport = () => {
    let csvContent = "Booking ID,Customer Email,Date,Items,Payment Status,Total\n";

    bookings.forEach((booking) => {
      const items = booking.items.map(item =>
        `${item.name} (Rs ${item.rentPerDay} × ${item.days} days)`
      ).join('; ');

      csvContent += [
        booking._id,
        booking.userId?.email || "Guest",
        new Date(booking.createdAt).toLocaleString(),
        items,
        booking.paymentStatus === "Yes" ? "Paid" : "Unpaid",
        `Rs ${booking.total}`
      ].join(',') + '\n';
    });

    return {
      csv: csvContent
    };
  };

  const generateSingleBookingPDF = (booking) => {
    const doc = new jsPDF();
    doc.setFont('helvetica');
    doc.setFontSize(12);

    // Header - Company Info
    doc.setFontSize(16);
    doc.setTextColor(40);
    doc.text('Rental Service', 14, 20);
    doc.setFontSize(10);
    doc.text('123 Business Street', 14, 26);
    doc.text('Business City, ST 10000', 14, 32);

    // Invoice Title
    doc.setFontSize(20);
    doc.text('INVOICE', 160, 20, { align: 'right' });

    // Invoice Info
    doc.setFontSize(10);
    doc.text(`Invoice #: ${booking._id}`, 160, 30, { align: 'right' });
    doc.text(`Date: ${new Date(booking.createdAt).toLocaleDateString()}`, 160, 36, { align: 'right' });
    doc.text(`Due Date: ${new Date(new Date(booking.createdAt).setDate(new Date(booking.createdAt).getDate() + 15)).toLocaleDateString()}`, 160, 42, { align: 'right' });

    // Bill To section
    doc.setFontSize(12);
    doc.text('BILL TO:', 14, 50);
    doc.setFontSize(10);
    doc.text(booking.userId?.name || 'Guest Customer', 14, 56);
    doc.text(booking.userId?.address || '123 Customer Street', 14, 62);
    doc.text(`${booking.userId?.city || 'Customer City'}, ${booking.userId?.state || 'ST'} ${booking.userId?.zip || '10001'}`, 14, 68);

    // Payment status
    doc.setFontSize(12);
    doc.setTextColor(booking.paymentStatus === "Yes" ? '#065f46' : '#b91c1c');
    doc.text(`Status: ${booking.paymentStatus === "Yes" ? 'PAID' : 'UNPAID'}`, 160, 50, { align: 'right' });
    doc.setTextColor(40);

    // Line separator
    doc.setDrawColor(200);
    doc.line(14, 74, 196, 74);

    // Table header
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('QTY', 14, 84);
    doc.text('DESCRIPTION', 40, 84);
    doc.text('UNIT PRICE', 130, 84, { align: 'right' });
    doc.text('AMOUNT', 180, 84, { align: 'right' });
    doc.setFont('helvetica', 'normal');

    // Table rows
    let y = 92;
    booking.items.forEach((item, index) => {
      doc.text(`${item.quantity || 1}`, 14, y);
      doc.text(`${item.name} (${item.type})`, 40, y);
      doc.text(`Rs ${item.rentPerDay}`, 130, y, { align: 'right' });
      doc.text(`Rs ${item.rentPerDay * (item.days || 1)}`, 180, y, { align: 'right' });
      y += 8;
    });

    // Line separator
    doc.setDrawColor(200);
    doc.line(14, y + 4, 196, y + 4);

    // Totals
    doc.setFont('helvetica', 'bold');
    doc.text('Subtotal:', 150, y + 12, { align: 'right' });
    doc.text(`Rs ${booking.total}`, 180, y + 12, { align: 'right' });

    doc.text('Sales Tax (5.0%):', 150, y + 20, { align: 'right' });
    doc.text(`Rs ${(booking.total * 0.05).toFixed(2)}`, 180, y + 20, { align: 'right' });

    doc.setFontSize(14);
    doc.text('Invoice Total:', 150, y + 30, { align: 'right' });
    doc.text(`Rs ${(booking.total * 1.05).toFixed(2)}`, 180, y + 30, { align: 'right' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    // Terms and conditions
    doc.text('TERMS & CONDITIONS', 14, y + 45);
    doc.text('Payment is due within 15 days', 14, y + 51);
    doc.text('Please make checks payable to Rental Service', 14, y + 57);
    doc.text('Bank: Business Bank | Account: 1234567890 | Routing: 088765432', 14, y + 63);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text('Thank you for your business!', 105, 285, { align: 'center' });

    return doc;
  };

  const downloadCSV = () => {
    const { csv } = generateReport();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `bookings_report_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = () => {
    bookings.forEach(booking => {
      const doc = generateSingleBookingPDF(booking);
      doc.save(`booking_${booking._id}_${new Date(booking.createdAt).toISOString().slice(0, 10)}.pdf`);
    });
  };

  const downloadSinglePDF = (booking) => {
    const doc = generateSingleBookingPDF(booking);
    doc.save(`booking_${booking._id}_${new Date(booking.createdAt).toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">All Bookings</h2>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage customer bookings and payments</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={downloadCSV}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-colors flex items-center text-sm sm:text-base shadow-md hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Export CSV
            </button>
            <button
              onClick={downloadPDF}
              className="px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg hover:from-violet-600 hover:to-purple-700 transition-colors flex items-center text-sm sm:text-base shadow-md hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Export PDF
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border-l-4 border-rose-500 rounded-lg">
            <div className="flex items-center text-rose-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Error:</span> {error}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-lg flex items-center text-amber-800">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-amber-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </div>
        )}

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-800">No bookings found</h3>
            <p className="mt-2 text-sm text-gray-600">All customer bookings will appear here</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Booking
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Items
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {bookings.map((booking, index) => (
                    <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-800">#{index + 1}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-800">
                          {booking.userId?.email || "Guest"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-800">
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(booking.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-800 space-y-2">
                          {booking.items.map((item, j) => (
                            <div key={j} className="flex items-start">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                item.type === 'Camera' ? 'bg-blue-100 text-blue-800' :
                                item.type === 'Lens' ? 'bg-indigo-100 text-indigo-800' :
                                item.type === 'Light' ? 'bg-amber-100 text-amber-800' :
                                'bg-gray-100 text-gray-800'
                              } mr-2 mt-0.5`}>
                                {item.type}
                              </span>
                              <span>
                                {item.name} (Rs {item.rentPerDay} × {item.days} days)
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.paymentStatus === "Yes"
                            ? 'bg-green-100 text-green-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {booking.paymentStatus === "Yes" ? 'Paid' : 'Unpaid'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-800">
                          Rs {booking.total}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          {booking.paymentStatus === "No" && (
                            <button
                              onClick={() => markAsPaid(booking._id)}
                              disabled={isLoading}
                              className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
                              title="Mark as Paid"
                            >
                              {isLoading ? (
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                              ) : (
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                              )}
                            </button>
                          )}
                          <button
                            onClick={() => downloadSinglePDF(booking)}
                            className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
                            title="Download PDF"
                          >
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookings;
