// backend/controllers/hireController.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const HireVehicle = require('../models/HireVehicle');
const HireBooking = require('../models/HireBooking');

const getHireVehicles = async (req, res) => {
  const { journeyType, pickupLocation, dropLocation, passengerCount } = req.query;
  let vehicles = await HireVehicle.find({ available: true });
  
  // Filter by capacity
  if (passengerCount) {
    vehicles = vehicles.filter(v => v.capacity >= parseInt(passengerCount));
  }
  
  // Calculate estimated price for each vehicle (dummy distance)
  const distance = 100; // In real app, calculate using maps API
  vehicles = vehicles.map(vehicle => ({
    ...vehicle.toObject(),
    estimatedPrice: vehicle.basePrice + (vehicle.pricePerKm * distance),
    estimatedDistance: distance
  }));
  
  res.json(vehicles);
};

const getVehicleById = async (req, res) => {
  const vehicle = await HireVehicle.findById(req.params.id);
  if (vehicle) {
    res.json(vehicle);
  } else {
    res.status(404).json({ message: 'Vehicle not found' });
  }
};

const createHirePaymentIntent = async (req, res) => {
  const { amount, currency = 'lkr' } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      payment_method_types: ['card']
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createHireBooking = async (req, res) => {
  const { vehicleId, journeyType, pickupLocation, dropLocation, pickupDate, returnDate, totalDistance, totalFare, passengerCount, paymentIntentId } = req.body;
  
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (paymentIntent.status !== 'succeeded') {
    return res.status(400).json({ message: 'Payment not successful' });
  }
  
  const booking = await HireBooking.create({
    user: req.user._id,
    vehicle: vehicleId,
    journeyType,
    pickupLocation,
    dropLocation,
    pickupDate: new Date(pickupDate),
    returnDate: new Date(returnDate),
    totalDistance,
    totalFare,
    passengerCount,
    paymentStatus: 'Paid',
    stripePaymentIntentId: paymentIntentId
  });
  
  res.status(201).json(booking);
};

const getUserHireBookings = async (req, res) => {
  const bookings = await HireBooking.find({ user: req.user._id }).populate('vehicle').sort('-createdAt');
  res.json(bookings);
};

module.exports = { getHireVehicles, getVehicleById, createHirePaymentIntent, createHireBooking, getUserHireBookings };