// frontend/src/pages/BusHire/HireSuccess.jsx
import { Link } from 'react-router-dom'
import { FaCheckCircle, FaTicketAlt } from 'react-icons/fa'

const HireSuccess = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-6">Your bus hire has been successfully booked.</p>
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
          <p className="font-semibold">What's next?</p>
          <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
            <li>You will receive a confirmation email shortly.</li>
            <li>The operator will contact you within 2 hours.</li>
            <li>You can view all bookings in "My Bookings" section.</li>
          </ul>
        </div>
        <div className="flex gap-4 justify-center">
          <Link to="/my-bookings" className="bg-quickbus-teal text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2">
            <FaTicketAlt /> View My Bookings
          </Link>
          <Link to="/" className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HireSuccess