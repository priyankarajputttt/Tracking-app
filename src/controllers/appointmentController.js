const appointmentService = require('../services/appointmentService');

// Controller function for creating a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const appointmentData = req.body;
    const guestEmail = req.body.guestEmail; // Assuming guestEmail is provided in the request body
    const appointment = await appointmentService.createAppointment(appointmentData, guestEmail);
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function for viewing all appointments
exports.viewAppointments = async (req, res) => {
  try {
    const appointments = await appointmentService.viewAppointments();
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
