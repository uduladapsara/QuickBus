// backend/routes/bookingRoutes.js
const express = require('express');
const { createPaymentIntent, createBooking, getUserBookings, getBookingById } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create-payment-intent', protect, createPaymentIntent);
router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getUserBookings);
router.get('/:id', protect, getBookingById);

module.exports = router;