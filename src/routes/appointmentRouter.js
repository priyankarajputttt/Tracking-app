const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authenticationMiddleware = require("../middleware/authentication");
const validateRequest = require("../validator/validator");
const appointmentSchema = require("../schemas/appointmentSchema");
router.use(authenticationMiddleware);

// Create a new appointment
router.post('/create/:email',   validateRequest(appointmentSchema.createAppointment, "body"),
appointmentController.createAppointment);

// view aprticular appointment
router.get('/get/:email', appointmentController.viewAppointments);

module.exports = router;
