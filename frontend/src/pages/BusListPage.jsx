// frontend/src/pages/BusListPage.jsx
import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { searchBuses, setSearchParams } from '../redux/slices/busSlice'
import { FaClock, FaMapMarkerAlt, FaStar, FaRupeeSign, FaFilter } from 'react-icons/fa'

const BusListPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { buses, loading } = useSelector((state) => state.bus)
  const [sortBy, setSortBy] = useState('departure')
  const [filterType, setFilterType] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const source = searchParams.get('source')
  const destination = searchParams.get('destination')
  const date = searchParams.get('date')

  useEffect(() => {
    if (source && destination && date) {
      dispatch(searchBuses({ source, destination, date }))
      dispatch(setSearchParams({ source, destination, date }))
    }
  }, [dispatch, source, destination, date])

  const getFilteredBuses = () => {
    let filtered = [...buses]
    if (filterType !== 'all') {
      filtered = filtered.filter(bus => bus.busType === filterType)
    }
    // Sort
    switch(sortBy) {
      case 'departure':
        filtered.sort((a,b) => a.departureTime.localeCompare(b.departureTime))
        break
      case 'fare':
        filtered.sort((a,b) => a.fare - b.fare)
        break
      case 'duration':
        filtered.sort((a,b) => parseInt(a.duration) - parseInt(b.duration))
        break
      case 'ratings':
        filtered.sort((a,b) => b.operatorRating - a.operatorRating)
        break
      default:
        break
    }
    return filtered
  }

  const handleViewSeats = (bus) => {
    navigate(`/select-seats?busId=${bus._id}&date=${date}&fare=${bus.fare}&operator=${bus.operatorName}&busType=${bus.busType}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{source} to {destination}</h1>
        <p className="text-gray-600">{date} • {buses.length} buses found</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className="lg:w-64">
          <div className="bg-white rounded-xl shadow-md p-4 sticky top-20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold flex items-center gap-2"><FaFilter /> Filters</h3>
              <button className="lg:hidden text-quickbus-orange" onClick={() => setShowFilters(!showFilters)}>
                {showFilters ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className={`${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Bus Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="all">All Types</option>
                  <option value="Seater">Seater</option>
                  <option value="A/C Seater">A/C Seater</option>
                  <option value="Non-A/C">Non-A/C</option>
                  <option value="Sleeper">Sleeper</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bus List */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-md p-4 mb-4 flex justify-between items-center">
            <span className="font-semibold">Sort By:</span>
            <div className="flex gap-2 flex-wrap">
              {['departure', 'duration', 'arrivals', 'ratings', 'fare'].map(option => (
                <button
                  key={option}
                  onClick={() => setSortBy(option)}
                  className={`px-3 py-1 rounded-full text-sm ${sortBy === option ? 'bg-quickbus-orange text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading buses...</div>
          ) : getFilteredBuses().length === 0 ? (
            <div className="text-center py-12">No buses found for this route</div>
          ) : (
            getFilteredBuses().map((bus) => (
              <div key={bus._id} className="bg-white rounded-xl shadow-md mb-4 p-4 hover:shadow-lg transition">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{bus.operatorName}</h3>
                      {bus.redDeal && <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded">redDeal</span>}
                      <div className="flex items-center text-yellow-500">
                        <FaStar /> <span className="ml-1 text-sm">{bus.operatorRating}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-2xl font-bold">{bus.departureTime}</p>
                        <p className="text-sm text-gray-500">{bus.sourceCity}</p>
                      </div>
                      <div className="text-center">
                        <FaClock className="mx-auto text-gray-400" />
                        <p className="text-xs">{bus.duration}</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{bus.arrivalTime}</p>
                        <p className="text-sm text-gray-500">{bus.destinationCity}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 text-sm text-gray-500">
                      <span>{bus.busType}</span>
                      {bus.liveTracking && <span className="text-green-600">• Live Tracking</span>}
                      {bus.reschedulable && <span className="text-blue-600">• Reschedulable</span>}
                    </div>
                  </div>
                  <div className="text-right mt-4 md:mt-0">
                    <p className="text-2xl font-bold text-quickbus-orange">₹{bus.fare}</p>
                    <p className="text-sm text-gray-500">per seat</p>
                    <p className="text-sm text-green-600">{bus.schedule?.availableSeats || 40} seats available</p>
                    <button
                      onClick={() => handleViewSeats(bus)}
                      className="mt-2 bg-quickbus-teal text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition"
                    >
                      VIEW SEATS
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default BusListPage