// backend/models/HireBooking.js
const mongoose = require('mongoose');

const hireBookingSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'HireVehicle', required: true },
  journeyType: { type: String, enum: ['Local', 'Outstation', 'Airport'], required: true },
  pickupLocation: { type: String, required: true },
  dropLocation: { type: String, required: true },
  pickupDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  totalDistance: { type: Number, required: true },
  totalFare: { type: Number, required: true },
  passengerCount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  stripePaymentIntentId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('HireBooking', hireBookingSchema);