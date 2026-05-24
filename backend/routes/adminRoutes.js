// backend/routes/adminRoutes.js
const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  createBus, updateBus, deleteBus, getAllBuses,
  getAllUsers, deleteUser, getAllBookings,
  createHireVehicle, updateHireVehicle, deleteHireVehicle, getAllHireVehicles,
  getDashboardStats
} = require('../controllers/adminController');

const router = express.Router();

router.use(protect, admin);

router.get('/dashboard', getDashboardStats);
router.get('/buses', getAllBuses);
router.post('/buses', createBus);
router.put('/buses/:id', updateBus);
router.delete('/buses/:id', deleteBus);

router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

router.get('/bookings', getAllBookings);

router.get('/hire-vehicles', getAllHireVehicles);
router.post('/hire-vehicles', createHireVehicle);
router.put('/hire-vehicles/:id', updateHireVehicle);
router.delete('/hire-vehicles/:id', deleteHireVehicle);

module.exports = router;