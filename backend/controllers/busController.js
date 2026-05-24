// backend/controllers/busController.js
const Bus = require('../models/Bus');
const BusSchedule = require('../models/BusSchedule');

const searchBuses = async (req, res) => {
  const { source, destination, date } = req.query;
  if (!source || !destination || !date) {
    return res.status(400).json({ message: 'Source, destination and date are required' });
  }
  
  const travelDate = new Date(date);
  travelDate.setHours(0, 0, 0, 0);
  const nextDay = new Date(travelDate);
  nextDay.setDate(travelDate.getDate() + 1);
  
  const buses = await Bus.find({
    sourceCity: { $regex: new RegExp(`^${source}$`, 'i') },
    destinationCity: { $regex: new RegExp(`^${destination}$`, 'i') }
  });
  
  const busIds = buses.map(bus => bus._id);
  const schedules = await BusSchedule.find({
    busId: { $in: busIds },
    travelDate: { $gte: travelDate, $lt: nextDay }
  });
  
  const scheduleMap = new Map();
  schedules.forEach(schedule => {
    scheduleMap.set(schedule.busId.toString(), schedule);
  });
  
  const result = buses.map(bus => {
    const schedule = scheduleMap.get(bus._id.toString());
    return {
      ...bus.toObject(),
      schedule: schedule ? {
        availableSeats: schedule.availableSeats,
        bookedSeats: schedule.bookedSeats
      } : null,
      isAvailable: schedule ? schedule.availableSeats > 0 : true
    };
  });
  
  res.json(result);
};

const getBusById = async (req, res) => {
  const bus = await Bus.findById(req.params.id);
  if (bus) {
    res.json(bus);
  } else {
    res.status(404).json({ message: 'Bus not found' });
  }
};

const getSeatLayout = async (req, res) => {
  const { busId, date } = req.query;
  const travelDate = new Date(date);
  travelDate.setHours(0, 0, 0, 0);
  
  const bus = await Bus.findById(busId);
  if (!bus) {
    return res.status(404).json({ message: 'Bus not found' });
  }
  
  let schedule = await BusSchedule.findOne({ busId, travelDate });
  if (!schedule) {
    // Create new schedule if not exists with all seats available
    schedule = await BusSchedule.create({
      busId,
      travelDate,
      bookedSeats: [],
      availableSeats: bus.totalSeats,
      totalSeats: bus.totalSeats
    });
  }
  
  // Generate seat layout if not present
  let seatsLayout = bus.seatsLayout;
  if (!seatsLayout || seatsLayout.length === 0) {
    const rows = Math.ceil(bus.totalSeats / 4);
    seatsLayout = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < 4; j++) {
        const seatNum = i * 4 + j + 1;
        if (seatNum <= bus.totalSeats) {
          row.push(`S${seatNum}`);
        } else {
          row.push('');
        }
      }
      seatsLayout.push(row);
    }
  }
  
  res.json({
    bus: bus.toObject(),
    schedule: schedule,
    seatsLayout
  });
};

const createBusSchedule = async (req, res) => {
  const { busId, travelDate } = req.body;
  const bus = await Bus.findById(busId);
  if (!bus) {
    return res.status(404).json({ message: 'Bus not found' });
  }
  
  const schedule = await BusSchedule.create({
    busId,
    travelDate: new Date(travelDate),
    bookedSeats: [],
    availableSeats: bus.totalSeats,
    totalSeats: bus.totalSeats
  });
  res.status(201).json(schedule);
};

module.exports = { searchBuses, getBusById, getSeatLayout, createBusSchedule };