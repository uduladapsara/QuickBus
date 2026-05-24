// frontend/src/components/Footer.jsx
import { FaFacebook, FaTwitter, FaInstagram, FaBus, FaEnvelope, FaPhone } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-quickbus-dark text-white mt-12">
      <div className="container mx-auto px-4 py-10">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold mb-4">
              <FaBus className="text-quickbus-orange" />
              <span>QuickBus</span>
            </div>
            <p className="text-gray-300 text-sm">Sri Lanka's most trusted bus ticketing platform. Safe, comfortable & affordable travel.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-quickbus-orange">Home</a></li>
              <li><a href="/bus-hire" className="hover:text-quickbus-orange">Bus Hire</a></li>
              <li><a href="/my-bookings" className="hover:text-quickbus-orange">My Bookings</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-quickbus-orange">FAQ</a></li>
              <li><a href="#" className="hover:text-quickbus-orange">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-quickbus-orange">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><FaPhone /> +94 11 234 5678</li>
              <li className="flex items-center gap-2"><FaEnvelope /> support@quickbus.lk</li>
              <li className="flex gap-3 mt-3">
                <a href="#" className="hover:text-quickbus-orange"><FaFacebook size={20} /></a>
                <a href="#" className="hover:text-quickbus-orange"><FaTwitter size={20} /></a>
                <a href="#" className="hover:text-quickbus-orange"><FaInstagram size={20} /></a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} QuickBus. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer