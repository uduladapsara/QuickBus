// frontend/src/pages/BusHire/BusHire.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCar, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from 'react-icons/fa'

const BusHire = () => {
  const navigate = useNavigate()
  const [journeyType, setJourneyType] = useState('Outstation')
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropLocation: '',
    pickupDate: '',
    returnDate: '',
    passengerCount: 1
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.pickupLocation || !formData.dropLocation || !formData.pickupDate) {
      alert('Please fill all required fields')
      return
    }
    navigate(`/hire-vehicles?journeyType=${journeyType}&pickup=${formData.pickupLocation}&drop=${formData.dropLocation}&pickupDate=${formData.pickupDate}&returnDate=${formData.returnDate}&passengers=${formData.passengerCount}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-quickbus-dark">Bus Hire</h1>
          <p className="text-gray-600 mt-2">Rent vehicles with a driver from the best operators</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Choose Journey Type</h3>
            <div className="grid grid-cols-3 gap-4">
              {['Local', 'Outstation', 'Airport'].map(type => (
                <button
                  key={type}
                  onClick={() => setJourneyType(type)}
                  className={`p-4 rounded-xl border-2 transition ${journeyType === type ? 'border-quickbus-orange bg-orange-50 text-quickbus-orange' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <FaCar className="mx-auto text-2xl mb-2" />
                  <span className="font-medium">{type}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Pickup Location</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})}
                    className="pl-10 w-full p-3 border rounded-lg"
                    placeholder="Enter pickup city"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Drop Location</label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={formData.dropLocation}
                    onChange={(e) => setFormData({...formData, dropLocation: e.target.value})}
                    className="pl-10 w-full p-3 border rounded-lg"
                    placeholder="Enter drop city"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Pickup Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="date"
                    required
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                    className="pl-10 w-full p-3 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Return Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="date"
                    value={formData.returnDate}
                    onChange={(e) => setFormData({...formData, returnDate: e.target.value})}
                    className="pl-10 w-full p-3 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Number of Passengers</label>
                <div className="relative">
                  <FaUsers className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={formData.passengerCount}
                    onChange={(e) => setFormData({...formData, passengerCount: parseInt(e.target.value)})}
                    className="pl-10 w-full p-3 border rounded-lg"
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="w-full bg-quickbus-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
              Find Vehicles
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default BusHire