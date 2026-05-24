// backend/controllers/bookingController.js
const Booking = require('../models/Booking');
const BusSchedule = require('../models/BusSchedule');
const Bus = require('../models/Bus');

const getStripeClient = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('Stripe secret key is not configured');
  }
  return require('stripe')(secretKey);
};

const createPaymentIntent = async (req, res) => {
  const { amount, currency = 'lkr' } = req.body;
  try {
    const numericAmount = Number(amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const stripe = getStripeClient();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(numericAmount * 100),
      currency,
      payment_method_types: ['card']
    });
    return res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createBooking = async (req, res) => {
  const { busId, travelDate, selectedSeats, boardingPoint, droppingPoint, passengers, totalFare, paymentIntentId } = req.body;
  
  const travelDateObj = new Date(travelDate);
  travelDateObj.setHours(0, 0, 0, 0);
  
  // Verify payment intent
  const stripe = getStripeClient();
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (paymentIntent.status !== 'succeeded') {
    return res.status(400).json({ message: 'Payment not successful' });
  }
  
  // Check and update seat availability
  const schedule = await BusSchedule.findOne({ busId: busId, travelDate: travelDateObj });
  if (!schedule) {
    return res.status(404).json({ message: 'Schedule not found' });
  }
  
  const alreadyBooked = selectedSeats.some(seat => schedule.bookedSeats.includes(seat));
  if (alreadyBooked) {
    return res.status(400).json({ message: 'Some seats are already booked' });
  }
  
  // Update schedule
  schedule.bookedSeats.push(...selectedSeats);
  schedule.availableSeats = schedule.totalSeats - schedule.bookedSeats.length;
  await schedule.save();
  
  const booking = await Booking.create({
    user: req.user._id,
    bus: busId,
    travelDate: travelDateObj,
    selectedSeats,
    boardingPoint,
    droppingPoint,
    passengers,
    totalFare,
    paymentStatus: 'Paid',
    stripePaymentIntentId: paymentIntentId
  });
  
  res.status(201).json(booking);
};

const getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate('bus').sort('-createdAt');
  res.json(bookings);
};

const getBookingById = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('bus').populate('user');
  if (booking && (booking.user._id.toString() === req.user._id.toString() || req.user.isAdmin)) {
    res.json(booking);
  } else {
    res.status(404).json({ message: 'Booking not found' });
  }
};

module.exports = { createPaymentIntent, createBooking, getUserBookings, getBookingById };