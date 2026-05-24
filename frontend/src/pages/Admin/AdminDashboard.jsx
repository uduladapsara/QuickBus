// frontend/src/pages/Admin/AdminDashboard.jsx
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { FaUsers, FaBus, FaTicketAlt, FaRupeeSign } from 'react-icons/fa'
import api from '../../services/api'

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalBuses: 0, totalBookings: 0, totalRevenue: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/dashboard')
        setStats(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const cards = [
    { title: 'Total Users', value: stats.totalUsers, icon: <FaUsers />, color: 'bg-blue-500' },
    { title: 'Total Buses', value: stats.totalBuses, icon: <FaBus />, color: 'bg-green-500' },
    { title: 'Total Bookings', value: stats.totalBookings, icon: <FaTicketAlt />, color: 'bg-purple-500' },
    { title: 'Revenue', value: `₹${stats.totalRevenue}`, icon: <FaRupeeSign />, color: 'bg-orange-500' }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6">
              <div className={`w-12 h-12 ${card.color} text-white rounded-lg flex items-center justify-center text-xl mb-4`}>
                {card.icon}
              </div>
              <p className="text-gray-500 text-sm">{card.title}</p>
              <p className="text-2xl font-bold">{card.value}</p>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <a href="/admin/buses" className="block text-quickbus-orange">Manage Buses →</a>
            <a href="/admin/users" className="block text-quickbus-orange">Manage Users →</a>
            <a href="/admin/hire-vehicles" className="block text-quickbus-orange">Manage Hire Vehicles →</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard