// backend/routes/hireRoutes.js
const express = require('express');
const { getHireVehicles, getVehicleById, createHirePaymentIntent, createHireBooking, getUserHireBookings } = require('../controllers/hireController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/vehicles', getHireVehicles);
router.get('/vehicles/:id', getVehicleById);
router.post('/create-payment-intent', protect, createHirePaymentIntent);
router.post('/bookings', protect, createHireBooking);
router.get('/my-bookings', protect, getUserHireBookings);

module.exports = router;