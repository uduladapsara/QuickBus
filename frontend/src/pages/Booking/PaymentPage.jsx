// frontend/src/pages/Booking/PaymentPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { createBooking } from '../../redux/slices/bookingSlice'
import api from '../../services/api'
import { FaCreditCard, FaWallet, FaAmazon } from 'react-icons/fa'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_51OcQHhSBa8YJvZ9HVz4jKpLmN2oP3qRsT4uVwXyZ6aB7cD8eF9gH0iJ1kL2mN3oP4qR5sT6uV7wX8yZ')

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { selectedSeats, selectedBus } = useSelector((state) => state.bus)
  const { boardingPoint, droppingPoint, passengers } = useSelector((state) => state.booking)
  const [processing, setProcessing] = useState(false)

  const totalAmount = selectedSeats.length * parseInt(selectedBus?.fare || 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setProcessing(true)

    try {
      // Create payment intent
      const { data: intentData } = await api.post('/bookings/create-payment-intent', {
        amount: totalAmount,
        currency: 'lkr'
      }, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}` }
      })

      const { error, paymentIntent } = await stripe.confirmCardPayment(intentData.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      })

      if (error) {
        alert(error.message)
        setProcessing(false)
        return
      }

      if (paymentIntent.status === 'succeeded') {
        // Create booking
        const bookingData = {
          busId: selectedBus.busId,
          travelDate: selectedBus.date,
          selectedSeats,
          boardingPoint,
          droppingPoint,
          passengers: passengers.map(p => ({ name: p.name, age: parseInt(p.age), gender: p.gender })),
          totalFare: totalAmount,
          paymentIntentId: paymentIntent.id
        }
        
        await dispatch(createBooking(bookingData)).unwrap()
        navigate('/booking-success')
      }
    } catch (err) {
      alert(err.message || 'Payment failed')
    }
    setProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border p-4 rounded-lg">
        <label className="block text-sm font-medium mb-2">Card Details</label>
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} className="p-3 border rounded" />
        <p className="text-xs text-gray-500 mt-2">Test Card: 4242 4242 4242 4242 | Exp: 12/21 | CVV: 123</p>
      </div>
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-quickbus-orange text-white py-3 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50"
      >
        {processing ? 'Processing...' : `Pay ₹${totalAmount} with Stripe`}
      </button>
    </form>
  )
}

const PaymentPage = () => {
  const navigate = useNavigate()
  const { selectedSeats, selectedBus } = useSelector((state) => state.bus)
  const totalAmount = selectedSeats.length * parseInt(selectedBus?.fare || 0)

  if (!selectedBus || selectedSeats.length === 0 || totalAmount <= 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Payment</h2>
          <p className="text-gray-600 mb-4">Missing booking details. Please select seats again.</p>
          <button
            type="button"
            onClick={() => navigate('/select-seats')}
            className="bg-quickbus-orange text-white px-4 py-2 rounded-lg font-semibold"
          >
            Back to Seat Selection
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Payment</h2>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">Booking Summary</h3>
          <p>Bus: {selectedBus?.operator} ({selectedBus?.busType})</p>
          <p>Date: {selectedBus?.date}</p>
          <p>Seats: {selectedSeats.join(', ')}</p>
          <p className="text-xl font-bold mt-2">Total: ₹{totalAmount}</p>
        </div>
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Secure payment powered by Stripe</p>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage