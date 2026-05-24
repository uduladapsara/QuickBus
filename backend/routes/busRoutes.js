// backend/routes/busRoutes.js
const express = require('express');
const { searchBuses, getBusById, getSeatLayout, createBusSchedule } = require('../controllers/busController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/search', searchBuses);
router.get('/seat-layout', getSeatLayout);
router.get('/:id', getBusById);
router.post('/schedule', protect, admin, createBusSchedule);

module.exports = router;