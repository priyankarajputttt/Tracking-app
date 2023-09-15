const appointmentService = require('../services/appointmentService');

// Controller function for creating a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const appointmentData = req.body;
    const guestEmail = req.params.email; 
    const appointment = await appointmentService.createAppointment(appointmentData, guestEmail);
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ success: false, message: `Internal server error : ${error}` });
  }
};

// Controller function for viewing all appointments
exports.viewAppointments = async (req, res) => {
  try {
    const email = req.params.email
    const appointments = await appointmentService.viewAppointments(email);
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ success: false, message: `Internal server error : ${error}` });
  }
};
