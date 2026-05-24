// backend/models/Bus.js
const mongoose = require('mongoose');

const busSchema = mongoose.Schema({
  operatorName: { type: String, required: true },
  busNumber: { type: String, required: true, unique: true },
  busType: { type: String, enum: ['Seater', 'Sleeper', 'A/C Seater', 'Non-A/C'], required: true },
  totalSeats: { type: Number, required: true, default: 40 },
  amenities: [{ type: String }],
  sourceCity: { type: String, required: true },
  destinationCity: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  duration: { type: String, required: true },
  fare: { type: Number, required: true },
  liveTracking: { type: Boolean, default: false },
  reschedulable: { type: Boolean, default: false },
  redDeal: { type: Boolean, default: false },
  operatorRating: { type: Number, default: 4.0 },
  seatsLayout: { type: [[String]], default: [] } // 2D array for seat numbers
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);