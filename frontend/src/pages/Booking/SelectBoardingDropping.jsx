// frontend/src/pages/Booking/SelectBoardingDropping.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setBoardingDropping } from '../../redux/slices/bookingSlice'

const SelectBoardingDropping = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { selectedBus } = useSelector((state) => state.bus)
  const [boardingPoint, setBoardingPoint] = useState('')
  const [droppingPoint, setDroppingPoint] = useState('')

  // Mock boarding/dropping points
  const boardingPoints = ['Main Bus Stand', 'Railway Station Stop', 'City Center', 'Highway Entrance']
  const droppingPoints = ['City Center', 'Railway Station', 'Bus Terminal', 'Town Hall']

  const handleContinue = () => {
    if (!boardingPoint || !droppingPoint) {
      alert('Please select boarding and dropping points')
      return
    }
    dispatch(setBoardingDropping({ boardingPoint, droppingPoint }))
    navigate('/passenger-details')
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Select Boarding & Dropping Points</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Boarding Point</label>
            <select
              value={boardingPoint}
              onChange={(e) => setBoardingPoint(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-quickbus-orange"
            >
              <option value="">Select boarding point</option>
              {boardingPoints.map(point => (
                <option key={point} value={point}>{point}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Boarding time: 30 mins before departure</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Dropping Point</label>
            <select
              value={droppingPoint}
              onChange={(e) => setDroppingPoint(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-quickbus-orange"
            >
              <option value="">Select dropping point</option>
              {droppingPoints.map(point => (
                <option key={point} value={point}>{point}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleContinue}
            className="w-full bg-quickbus-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Continue to Passenger Details
          </button>
        </div>
      </div>
    </div>
  )
}

export default SelectBoardingDropping