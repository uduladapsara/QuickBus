// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import BusListPage from './pages/BusListPage'
import SelectSeats from './pages/Booking/SelectSeats'
import SelectBoardingDropping from './pages/Booking/SelectBoardingDropping'
import PassengerDetails from './pages/Booking/PassengerDetails'
import PaymentPage from './pages/Booking/PaymentPage'
import BookingSuccess from './pages/Booking/BookingSuccess'
import MyBookings from './pages/Booking/MyBookings'
import BusHire from './pages/BusHire/BusHire'
import HireVehiclesList from './pages/BusHire/HireVehiclesList'
import HirePayment from './pages/BusHire/HirePayment'
import HireSuccess from './pages/BusHire/HireSuccess'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminBuses from './pages/Admin/AdminBuses'
import AdminUsers from './pages/Admin/AdminUsers'
import AdminHireVehicles from './pages/Admin/AdminHireVehicles'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/buses" element={<BusListPage />} />
            <Route path="/select-seats" element={<PrivateRoute><SelectSeats /></PrivateRoute>} />
            <Route path="/select-boarding" element={<PrivateRoute><SelectBoardingDropping /></PrivateRoute>} />
            <Route path="/passenger-details" element={<PrivateRoute><PassengerDetails /></PrivateRoute>} />
            <Route path="/payment" element={<PrivateRoute><PaymentPage /></PrivateRoute>} />
            <Route path="/booking-success" element={<PrivateRoute><BookingSuccess /></PrivateRoute>} />
            <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
            <Route path="/bus-hire" element={<BusHire />} />
            <Route path="/hire-vehicles" element={<PrivateRoute><HireVehiclesList /></PrivateRoute>} />
            <Route path="/hire-payment" element={<PrivateRoute><HirePayment /></PrivateRoute>} />
            <Route path="/hire-success" element={<PrivateRoute><HireSuccess /></PrivateRoute>} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin/buses" element={<AdminRoute><AdminBuses /></AdminRoute>} />
            <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
            <Route path="/admin/hire-vehicles" element={<AdminRoute><AdminHireVehicles /></AdminRoute>} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </Router>
  )
}

export default App