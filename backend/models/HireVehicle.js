// backend/models/HireVehicle.js
const mongoose = require('mongoose');

const hireVehicleSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Sedan', 'SUV', 'Tempo', 'Mini Bus', 'Coach'], required: true },
  capacity: { type: Number, required: true },
  pricePerKm: { type: Number, required: true },
  basePrice: { type: Number, required: true },
  minKm: { type: Number, default: 100 },
  amenities: [{ type: String }],
  image: { type: String, default: '/vehicle-default.jpg' },
  available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('HireVehicle', hireVehicleSchema);