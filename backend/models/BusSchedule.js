// backend/models/BusSchedule.js
const mongoose = require('mongoose');

const busScheduleSchema = mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  travelDate: { type: Date, required: true },
  bookedSeats: [{ type: String }], // Array of seat numbers like "A1", "B2"
  availableSeats: { type: Number, required: true },
  totalSeats: { type: Number, required: true }
}, { timestamps: true });

busScheduleSchema.index({ busId: 1, travelDate: 1 }, { unique: true });

module.exports = mongoose.model('BusSchedule', busScheduleSchema);