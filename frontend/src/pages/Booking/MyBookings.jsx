// frontend/src/pages/Booking/MyBookings.jsx
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyBookings } from '../../redux/slices/bookingSlice'
import { fetchUserHireBookings } from '../../redux/slices/hireSlice'
import { FaBus, FaCar, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'

const MyBookings = () => {
  const dispatch = useDispatch()
  const { bookings, loading: bookingLoading } = useSelector((state) => state.booking)
  const { hireBookings, loading: hireLoading } = useSelector((state) => state.hire)

  useEffect(() => {
    dispatch(fetchMyBookings())
    dispatch(fetchUserHireBookings())
  }, [dispatch])

  const formatDate = (date) => new Date(date).toLocaleDateString()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      {/* Bus Bookings */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FaBus /> Bus Tickets</h2>
        {bookingLoading ? (
          <p>Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-500">No bus bookings found.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map(booking => (
              <div key={booking._id} className="bg-white rounded-xl shadow-md p-4">
                <div className="flex flex-wrap justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{booking.bus?.operatorName}</h3>
                    <p className="text-sm text-gray-500">{booking.bus?.busType} • {booking.bus?.busNumber}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span><strong>From:</strong> {booking.boardingPoint}</span>
                      <span><strong>To:</strong> {booking.droppingPoint}</span>
                    </div>
                    <p className="text-sm"><FaCalendarAlt className="inline mr-1" /> {formatDate(booking.travelDate)}</p>
                    <p><strong>Seats:</strong> {booking.selectedSeats.join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-quickbus-orange">₹{booking.totalFare}</p>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Paid</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hire Bookings */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FaCar /> Bus Hire</h2>
        {hireLoading ? (
          <p>Loading...</p>
        ) : hireBookings.length === 0 ? (
          <p className="text-gray-500">No hire bookings found.</p>
        ) : (
          <div className="space-y-4">
            {hireBookings.map(booking => (
              <div key={booking._id} className="bg-white rounded-xl shadow-md p-4">
                <div className="flex flex-wrap justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{booking.vehicle?.name}</h3>
                    <p className="text-sm text-gray-500">{booking.vehicle?.type} • Capacity: {booking.vehicle?.capacity}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <span><FaMapMarkerAlt /> {booking.pickupLocation} → {booking.dropLocation}</span>
                    </div>
                    <p className="text-sm"><FaCalendarAlt /> Pickup: {formatDate(booking.pickupDate)} | Return: {formatDate(booking.returnDate)}</p>
                    <p><strong>Distance:</strong> {booking.totalDistance} km</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-quickbus-orange">₹{booking.totalFare}</p>
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">Paid</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyBookings