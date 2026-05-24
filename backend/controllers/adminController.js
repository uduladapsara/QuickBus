// backend/controllers/adminController.js
const Bus = require('../models/Bus');
const User = require('../models/User');
const Booking = require('../models/Booking');
const HireVehicle = require('../models/HireVehicle');
const BusSchedule = require('../models/BusSchedule');

// Bus Management
const createBus = async (req, res) => {
  const bus = await Bus.create(req.body);
  res.status(201).json(bus);
};

const updateBus = async (req, res) => {
  const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (bus) res.json(bus);
  else res.status(404).json({ message: 'Bus not found' });
};

const deleteBus = async (req, res) => {
  const bus = await Bus.findByIdAndDelete(req.params.id);
  if (bus) res.json({ message: 'Bus deleted' });
  else res.status(404).json({ message: 'Bus not found' });
};

const getAllBuses = async (req, res) => {
  const buses = await Bus.find({});
  res.json(buses);
};

// User Management
const getAllUsers = async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
};

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (user) res.json({ message: 'User deleted' });
  else res.status(404).json({ message: 'User not found' });
};

// Booking Management
const getAllBookings = async (req, res) => {
  const bookings = await Booking.find({}).populate('user').populate('bus');
  res.json(bookings);
};

// Hire Vehicle Management
const createHireVehicle = async (req, res) => {
  const vehicle = await HireVehicle.create(req.body);
  res.status(201).json(vehicle);
};

const updateHireVehicle = async (req, res) => {
  const vehicle = await HireVehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (vehicle) res.json(vehicle);
  else res.status(404).json({ message: 'Vehicle not found' });
};

const deleteHireVehicle = async (req, res) => {
  const vehicle = await HireVehicle.findByIdAndDelete(req.params.id);
  if (vehicle) res.json({ message: 'Vehicle deleted' });
  else res.status(404).json({ message: 'Vehicle not found' });
};

const getAllHireVehicles = async (req, res) => {
  const vehicles = await HireVehicle.find({});
  res.json(vehicles);
};

// Dashboard Stats
const getDashboardStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalBuses = await Bus.countDocuments();
  const totalBookings = await Booking.countDocuments();
  const totalRevenue = await Booking.aggregate([
    { $match: { paymentStatus: 'Paid' } },
    { $group: { _id: null, total: { $sum: '$totalFare' } } }
  ]);
  res.json({
    totalUsers,
    totalBuses,
    totalBookings,
    totalRevenue: totalRevenue[0]?.total || 0
  });
};

module.exports = {
  createBus, updateBus, deleteBus, getAllBuses,
  getAllUsers, deleteUser, getAllBookings,
  createHireVehicle, updateHireVehicle, deleteHireVehicle, getAllHireVehicles,
  getDashboardStats
};