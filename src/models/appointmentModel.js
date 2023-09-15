const mongoose = require('mongoose');

// Define the Appointment schema
const appointmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  agenda: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  guest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Create the Appointment model
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;


  