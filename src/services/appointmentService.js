const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');

// Create a new appointment
// exports.createAppointment = async (appointmentData, guestEmail) => {
//   try {
//     const guestUser = await User.findOne({ email: guestEmail });
//     if (!guestUser) {
//       throw new Error('Guest user not found');
//     }
//     const appointment = new Appointment({
//       ...appointmentData,
//       guest: guestUser._id,
//     });
//     await appointment.save();
//     guestUser.appointments.push(appointment._id);
//     await guestUser.save();
//     return appointment;
//   } catch (error) {
//     throw new Error('Could not create appointment');
//   }
// };

// Create a new appointment
exports.createAppointment = async (appointmentData, guestEmail) => {
    try {
      // Check if the guest user exists
      const guestUser = await User.findOne({ email: guestEmail });
    if (!guestUser) {
      throw new Error('Guest user not found');
    }
  
      // Check if the guest user has any conflicting appointments
      const conflictingAppointments = await Appointment.find({
        guest: guestUser._id,
        $or: [
          {
            $and: [
              { startTime: { $lte: appointmentData.startTime } },
              { endTime: { $gte: appointmentData.endTime } },
            ],
          },
          {
            $and: [
              { startTime: { $lte: appointmentData.startTime } },
              { startTime: { $gt: appointmentData.startTime } },
            ],
          },
        ],
      });
  
      if (conflictingAppointments.length > 0) {
        throw new Error('Guest user is not available during this timeslot');
      }
  
      const appointment = new Appointment({
        ...appointmentData,
        guest: guestUser._id,
      });
  
      // Now, check if the appointment overlaps with the guest's off-hours
      for (const offHour of guestUser.offHours) {
        if (
          appointmentData.startTime >= offHour.start &&
          appointmentData.endTime <= offHour.end
        ) {
          throw new Error('Guest user is not available during this timeslot');
        }
      }
  
      await appointment.save();
      guestUser.appointments.push(appointment._id);
      await guestUser.save();
      return appointment;
    } catch (error) {
      throw new Error('Could not create appointment: ' + error.message);
    }
  };
  

// View all appointments
exports.viewAppointments = async () => {
  try {
    const appointments = await Appointment.find();
    return appointments;
  } catch (error) {
    throw new Error('Could not retrieve appointments');
  }
};
