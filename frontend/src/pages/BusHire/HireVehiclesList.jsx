// frontend/src/pages/BusHire/HireVehiclesList.jsx
import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHireVehicles, selectHireVehicle } from '../../redux/slices/hireSlice'
import { FaUsers, FaRupeeSign, FaShieldAlt, FaChartLine } from 'react-icons/fa'

const HireVehiclesList = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { vehicles, loading } = useSelector((state) => state.hire)
  const [selectedVehicle, setSelectedVehicle] = useState(null)

  const journeyType = searchParams.get('journeyType')
  const pickup = searchParams.get('pickup')
  const drop = searchParams.get('drop')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')
  const passengers = searchParams.get('passengers')

  useEffect(() => {
    if (pickup && drop && passengers) {
      dispatch(fetchHireVehicles({ journeyType, pickupLocation: pickup, dropLocation: drop, passengerCount: passengers }))
    }
  }, [dispatch, journeyType, pickup, drop, passengers])

  const handleViewDetails = (vehicle) => {
    setSelectedVehicle(vehicle)
  }

  const handleBook = () => {
    if (selectedVehicle) {
      dispatch(selectHireVehicle({ vehicle: selectedVehicle, journeyType, pickup, drop, pickupDate, returnDate, passengerCount: passengers }))
      navigate('/hire-payment')
    }
  }

  if (loading) return <div className="text-center py-12">Loading vehicles...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Available Vehicles for Hire</h1>
        <p className="text-gray-600">{pickup} → {drop} | {passengers} passengers | {journeyType}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map(vehicle => (
          <div key={vehicle._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold">{vehicle.name}</h3>
                <span className="bg-quickbus-teal text-white text-xs px-2 py-1 rounded">{vehicle.type}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <FaUsers /> Capacity: {vehicle.capacity}
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                <FaRupeeSign /> {vehicle.pricePerKm}/km + base {vehicle.basePrice}
              </div>
              <div className="mb-4">
                <p className="text-2xl font-bold text-quickbus-orange">₹{vehicle.estimatedPrice}</p>
                <p className="text-xs text-gray-500">Est. for {vehicle.estimatedDistance} km</p>
              </div>
              <button
                onClick={() => handleViewDetails(vehicle)}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                VIEW DETAILS
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for vehicle details */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-2">{selectedVehicle.name}</h3>
            <div className="space-y-2 text-sm mb-4">
              <p><strong>Type:</strong> {selectedVehicle.type}</p>
              <p><strong>Capacity:</strong> {selectedVehicle.capacity} persons</p>
              <p><strong>Base Price:</strong> ₹{selectedVehicle.basePrice}</p>
              <p><strong>Price per km:</strong> ₹{selectedVehicle.pricePerKm}</p>
              <p><strong>Minimum km:</strong> {selectedVehicle.minKm} km</p>
              <p><strong>Amenities:</strong> {selectedVehicle.amenities?.join(', ')}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setSelectedVehicle(null)} className="flex-1 bg-gray-200 py-2 rounded-lg">Cancel</button>
              <button onClick={handleBook} className="flex-1 bg-quickbus-orange text-white py-2 rounded-lg">Book Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HireVehiclesList