const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");

// Create a new appointment
exports.createAppointment = async (appointmentData, guestEmail) => {
  try {
    // Check if the guest user exists
    const guestUser = await User.findOne({ email: guestEmail });
    if (!guestUser) {
      throw new Error("Guest user not found");
    }

    // Check if the guest user has any conflicting appointments
    const conflictingAppointments = await Appointment.find({
      guest: guestUser._id,
      $or: [
        {
          $and: [
            { startTime: { $gte: appointmentData.startTime } },
            { startTime: { $lt: appointmentData.endTime } },
          ],
        },
        {
          $and: [
            { endTime: { $gt: appointmentData.startTime } },
            { endtime: { $lt: appointmentData.endTime } },
          ],
        },
      ],
    });
    if (conflictingAppointments.length > 0) {
      throw new Error(
        "Guest user already have an appointment for this time slot"
      );
    }

    const appointment = new Appointment({
      ...appointmentData,
      guest: guestUser._id,
    });
    // check if the appointment overlaps with the guest's off-hours
    for (const offHour of guestUser.offHours) {
      const offHourStart = new Date(offHour.start);
      const offHourEnd = new Date(offHour.end);
      const appointmentStart = new Date(appointmentData.startTime);
      const appointmentEnd = new Date(appointmentData.endTime);

      if (
        (appointmentStart >= offHourStart && appointmentStart < offHourEnd) ||
        (appointmentEnd > offHourStart && appointmentEnd <= offHourEnd) ||
        (appointmentStart <= offHourStart && appointmentEnd >= offHourEnd)
      ) {
        throw new Error("Guest user is not available during this timeslot");
      }
    }

    await appointment.save();
    guestUser.appointments.push(appointment._id);
    await guestUser.save();
    //console.log('appointment',appointment)
    return appointment;
  } catch (error) {
    throw new Error("Could not create appointment: " + error.message);
  }
};

// View appointments
exports.viewAppointments = async (email) => {
  try {
    const guestUser = await User.findOne({ email: email });
    if (!guestUser) {
      throw new Error("Guest user not found");
    }

    const appointments = await Appointment.find({ guest: guestUser._id });
    return appointments;
  } catch (error) {
    throw new Error("Could not retrieve appointments");
  }
};
