// frontend/src/pages/Booking/BookingSuccess.jsx
import { Link } from 'react-router-dom'
import { FaCheckCircle, FaTicketAlt } from 'react-icons/fa'

const BookingSuccess = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-6">Your bus tickets have been successfully booked.</p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
          <p className="font-semibold">Next steps:</p>
          <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
            <li>Confirmation email sent to your registered email.</li>
            <li>Show booking ID at boarding point.</li>
            <li>View all bookings in "My Bookings".</li>
          </ul>
        </div>
        <Link to="/my-bookings" className="inline-flex items-center gap-2 bg-quickbus-teal text-white px-6 py-2 rounded-lg font-semibold">
          <FaTicketAlt /> View My Bookings
        </Link>
      </div>
    </div>
  )
}

export default BookingSuccess