// frontend/src/pages/Booking/PassengerDetails.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setPassengers } from '../../redux/slices/bookingSlice'

const PassengerDetails = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { selectedSeats, selectedBus } = useSelector((state) => state.bus)
  const [passengers, setPassengers] = useState(
    selectedSeats.map((seat, index) => ({
      seatNumber: seat,
      name: '',
      age: '',
      gender: 'Male'
    }))
  )

  const handleChange = (index, field, value) => {
    const updated = [...passengers]
    updated[index][field] = value
    setPassengers(updated)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = passengers.every(p => p.name && p.age)
    if (!isValid) {
      alert('Please fill all passenger details')
      return
    }
    dispatch(setPassengers(passengers))
    navigate('/payment')
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Passenger Details</h2>
        <p className="text-gray-600 mb-6">Please provide details for {selectedSeats.length} passenger(s)</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {passengers.map((passenger, idx) => (
            <div key={idx} className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Passenger {idx + 1} - Seat {passenger.seatNumber}</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={passenger.name}
                  onChange={(e) => handleChange(idx, 'name', e.target.value)}
                  className="p-2 border rounded-lg"
                  required
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={passenger.age}
                  onChange={(e) => handleChange(idx, 'age', e.target.value)}
                  className="p-2 border rounded-lg"
                  required
                />
                <select
                  value={passenger.gender}
                  onChange={(e) => handleChange(idx, 'gender', e.target.value)}
                  className="p-2 border rounded-lg"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-quickbus-teal text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition"
          >
            Proceed to Pay
          </button>
        </form>
      </div>
    </div>
  )
}

export default PassengerDetails