// frontend/src/pages/HomePage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaBus, FaCalendarAlt, FaMapMarkerAlt, FaShieldAlt, FaHeadset, FaMobileAlt } from 'react-icons/fa'
import { format } from 'date-fns'

const destinations = [
  'Colombo', 'Galle', 'Kataragama', 'Kaluthara', 'Jafna', 'Kandy', 'Gampaha',
  'Anuradhapura', 'Monaragala', 'Negambo', 'Ampara', 'Beliaththa', 'Badulla'
]

const HomePage = () => {
  const navigate = useNavigate()
  const [searchData, setSearchData] = useState({
    source: 'Matara',
    destination: '',
    date: format(new Date(), 'yyyy-MM-dd')
  })

  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchData.source || !searchData.destination) {
      alert('Please select source and destination')
      return
    }
    navigate(`/buses?source=${searchData.source}&destination=${searchData.destination}&date=${searchData.date}`)
  }

  return (
    <div>
      {/* Hero Section with Search */}
      <div className="relative bg-gradient-to-r from-quickbus-dark to-gray-800 text-white">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Journey for Dreams
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Safe, Comfortable & Affordable Bus Travel Across Sri Lanka
            </p>
            
            {/* Search Box */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 text-gray-800">
              <form onSubmit={handleSearch} className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">From</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      value={searchData.source}
                      readOnly
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">To</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                    <select
                      value={searchData.destination}
                      onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-quickbus-orange focus:border-quickbus-orange"
                      required
                    >
                      <option value="">Select Destination</option>
                      {destinations.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date</label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="date"
                      value={searchData.date}
                      onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg"
                      min={format(new Date(), 'yyyy-MM-dd')}
                    />
                  </div>
                </div>
                <div className="flex items-end">
                  <button type="submit" className="w-full bg-quickbus-orange hover:bg-orange-600 text-white font-bold py-2 rounded-lg transition">
                    Search Buses
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <FaShieldAlt className="text-5xl text-quickbus-teal mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Safety+ Program</h3>
            <p className="text-gray-600">Certified sanitized buses with trained staff</p>
          </div>
          <div className="text-center p-6">
            <FaBus className="text-5xl text-quickbus-teal mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">1000+ Routes</h3>
            <p className="text-gray-600">Covering all major cities in Sri Lanka</p>
          </div>
          <div className="text-center p-6">
            <FaHeadset className="text-5xl text-quickbus-teal mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">Dedicated customer service team</p>
          </div>
          <div className="text-center p-6">
            <FaMobileAlt className="text-5xl text-quickbus-teal mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p className="text-gray-600">Book tickets in just a few clicks</p>
          </div>
        </div>
      </div>

      {/* Offer Banner */}
      <div className="bg-gradient-to-r from-quickbus-orange to-quickbus-teal text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-2">Save upto Rs 150</h2>
          <p className="text-xl">Early Bird Offer - 10% Discount on APSRTC Buses</p>
          <button className="mt-4 bg-white text-quickbus-orange px-6 py-2 rounded-full font-semibold hover:shadow-lg transition">
            Know More
          </button>
        </div>
      </div>

      {/* Popular Routes */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Routes from Matara</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {destinations.map(city => (
            <button
              key={city}
              onClick={() => {
                setSearchData({...searchData, destination: city})
                navigate(`/buses?source=Matara&destination=${city}&date=${searchData.date}`)
              }}
              className="bg-gray-100 hover:bg-quickbus-orange hover:text-white p-3 rounded-lg text-center transition duration-300"
            >
              Matara → {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage