// frontend/src/components/Navbar.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/slices/authSlice'
import { FaBus, FaUser, FaSignOutAlt, FaTachometerAlt, FaCalendarAlt, FaCar } from 'react-icons/fa'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { userInfo } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className="bg-quickbus-dark text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
            <FaBus className="text-quickbus-orange" />
            <span className="bg-gradient-to-r from-quickbus-orange to-quickbus-teal bg-clip-text text-transparent">
              QuickBus
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-quickbus-orange transition">Home</Link>
            <Link to="/bus-hire" className="hover:text-quickbus-orange transition flex items-center gap-1">
              <FaCar /> Bus Hire
            </Link>
            {userInfo && (
              <Link to="/my-bookings" className="hover:text-quickbus-orange transition flex items-center gap-1">
                <FaCalendarAlt /> My Bookings
              </Link>
            )}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
              >
                <FaUser />
                <span>{userInfo ? userInfo.name : 'Account'}</span>
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl z-50">
                  {userInfo ? (
                    <>
                      {userInfo.isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          <FaTachometerAlt /> Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                      >
                        <FaSignOutAlt /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-3">
            <Link to="/" className="block hover:text-quickbus-orange">Home</Link>
            <Link to="/bus-hire" className="block hover:text-quickbus-orange">Bus Hire</Link>
            {userInfo && (
              <Link to="/my-bookings" className="block hover:text-quickbus-orange">My Bookings</Link>
            )}
            {userInfo ? (
              <button onClick={handleLogout} className="block w-full text-left text-red-400">Logout</button>
            ) : (
              <>
                <Link to="/login" className="block hover:text-quickbus-orange">Login</Link>
                <Link to="/register" className="block hover:text-quickbus-orange">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar