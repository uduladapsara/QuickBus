// frontend/src/pages/Booking/SelectSeats.jsx
import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSeatLayout, selectSeats } from '../../redux/slices/busSlice'
import SeatMap from '../../components/SeatMap'
import SeatLegend from '../../components/SeatLegend'

const SelectSeats = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { seatLayout, selectedBus, schedule, loading } = useSelector((state) => state.bus)
  const [selectedSeatsList, setSelectedSeatsList] = useState([])

  const busId = searchParams.get('busId')
  const date = searchParams.get('date')
  const fare = searchParams.get('fare')
  const operator = searchParams.get('operator')
  const busType = searchParams.get('busType')

  useEffect(() => {
    if (busId && date) {
      dispatch(fetchSeatLayout({ busId, date }))
    }
  }, [dispatch, busId, date])

  const handleSeatToggle = (seatNumber) => {
    if (selectedSeatsList.includes(seatNumber)) {
      setSelectedSeatsList(selectedSeatsList.filter(s => s !== seatNumber))
    } else {
      setSelectedSeatsList([...selectedSeatsList, seatNumber])
    }
  }

  const handleContinue = () => {
    if (selectedSeatsList.length === 0) {
      alert('Please select at least one seat')
      return
    }
    dispatch(selectSeats({ seats: selectedSeatsList, busId, date, fare, operator, busType }))
    navigate('/select-boarding')
  }

  if (loading) return <div className="text-center py-12">Loading seat layout...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-2">Select Seats</h2>
        <p className="text-gray-600 mb-4">{operator} • {busType} • {date}</p>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-center font-semibold mb-4">Bus Layout</h3>
              <div className="flex justify-center">
                <SeatMap
                  seatsLayout={seatLayout}
                  bookedSeats={schedule?.bookedSeats || []}
                  selectedSeats={selectedSeatsList}
                  onSeatClick={handleSeatToggle}
                />
              </div>
            </div>
          </div>
          <div className="lg:w-80">
            <SeatLegend />
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Selected Seats</h3>
              {selectedSeatsList.length === 0 ? (
                <p className="text-gray-500">No seats selected</p>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {selectedSeatsList.map(seat => (
                      <span key={seat} className="bg-quickbus-teal text-white px-3 py-1 rounded-full text-sm">
                        {seat}
                      </span>
                    ))}
                  </div>
                  <p className="text-lg font-bold">
                    Total: ₹{selectedSeatsList.length * parseInt(fare)}
                  </p>
                </>
              )}
              <button
                onClick={handleContinue}
                className="w-full mt-4 bg-quickbus-orange text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                Continue to Boarding Point
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectSeats