// frontend/src/pages/RegisterPage.jsx
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../redux/slices/authSlice'
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [passwordError, setPasswordError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo, loading, error } = useSelector((state) => state.auth)

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [userInfo, navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match')
      return
    }
    setPasswordError('')
    const { confirmPassword, ...registerData } = formData
    dispatch(register(registerData))
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-quickbus-teal to-quickbus-orange py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-6">Create Account</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{error}</div>}
        {passwordError && <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">{passwordError}</div>}
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <div className="relative mt-1">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="pl-10 w-full px-3 py-2 border rounded-lg focus:ring-quickbus-orange focus:border-quickbus-orange"
                placeholder="John Doe"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <div className="relative mt-1">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="pl-10 w-full px-3 py-2 border rounded-lg"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <div className="relative mt-1">
              <FaPhone className="absolute left-3 top-3 text-gray-400" />
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="pl-10 w-full px-3 py-2 border rounded-lg"
                placeholder="0771234567"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <div className="relative mt-1">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="pl-10 w-full px-3 py-2 border rounded-lg"
                placeholder="••••••"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <div className="relative mt-1">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="pl-10 w-full px-3 py-2 border rounded-lg"
                placeholder="••••••"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-quickbus-orange text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-quickbus-orange font-medium">Sign In</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage