const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
router.use(authenticationMiddleware);

// Create a new appointment
router.post('/create', appointmentController.createAppointment);

// View all appointments
router.get('/get', appointmentController.viewAppointments);

module.exports = router;
