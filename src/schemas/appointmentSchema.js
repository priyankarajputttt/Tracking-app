const Joi = require("joi");

//appointment schemas
const appointmentSchemas = {
  createAppointment: Joi.object({
    title: Joi.string().required(),
    agenda: Joi.string().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required().greater(Joi.ref('startTime')),
  }),

 
};

module.exports = appointmentSchemas;