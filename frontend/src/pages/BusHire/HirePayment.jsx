// frontend/src/pages/BusHire/HirePayment.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { createHireBooking } from '../../redux/slices/hireSlice'
import api from '../../services/api'

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
    'pk_test_51OcQHhSBa8YJvZ9HVz4jKpLmN2oP3qRsT4uVwXyZ6aB7cD8eF9gH0iJ1kL2mN3oP4qR5sT6uV7wX8yZ'
)

const HirePaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { selectedHireVehicle, journeyType, pickupLocation, dropLocation, pickupDate, returnDate, passengerCount } = useSelector((state) => state.hire)
  const [processing, setProcessing] = useState(false)

  const totalAmount = selectedHireVehicle?.estimatedPrice || 0

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setProcessing(true)

    try {
      const { data: intentData } = await api.post('/hire/create-payment-intent', {
        amount: totalAmount,
        currency: 'lkr'
      }, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))?.token}` }
      })

      const { error, paymentIntent } = await stripe.confirmCardPayment(intentData.clientSecret, {
        payment_method: { card: elements.getElement(CardElement) }
      })

      if (error) {
        alert(error.message)
        setProcessing(false)
        return
      }

      if (paymentIntent.status === 'succeeded') {
        const bookingData = {
          vehicleId: selectedHireVehicle._id,
          journeyType,
          pickupLocation,
          dropLocation,
          pickupDate,
          returnDate,
          totalDistance: selectedHireVehicle.estimatedDistance,
          totalFare: totalAmount,
          passengerCount,
          paymentIntentId: paymentIntent.id
        }
        await dispatch(createHireBooking(bookingData)).unwrap()
        navigate('/hire-success')
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
        <CardElement className="p-3 border rounded" />
        <p className="text-xs text-gray-500 mt-2">Test Card: 4242 4242 4242 4242 | Exp: 12/21 | CVV: 123</p>
      </div>
      <button type="submit" disabled={!stripe || processing} className="w-full bg-quickbus-orange text-white py-3 rounded-lg font-semibold">
        {processing ? 'Processing...' : `Pay ₹${totalAmount} with Stripe`}
      </button>
    </form>
  )
}

const HirePayment = () => {
  const { selectedHireVehicle } = useSelector((state) => state.hire)
  if (!selectedHireVehicle) return <div className="text-center py-12">No vehicle selected</div>

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Hire Payment</h2>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">Trip Summary</h3>
          <p>Vehicle: {selectedHireVehicle.name} ({selectedHireVehicle.type})</p>
          <p>Estimated distance: {selectedHireVehicle.estimatedDistance} km</p>
          <p className="text-xl font-bold mt-2">Total: ₹{selectedHireVehicle.estimatedPrice}</p>
        </div>
        <Elements stripe={stripePromise}>
          <HirePaymentForm />
        </Elements>
      </div>
    </div>
  )
}

export default HirePayment