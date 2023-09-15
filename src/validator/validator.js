const Joi = require("joi");

const validateRequest = (schema, property) => {
  return async (req, res, next) => {
    const reqBody = property === "body" ? req.body : req.params;

    const error = schema.validate(reqBody);

    const valid = error?.error === null || error?.error === undefined;

    if (valid) {
      next();
    } else {
      const { details } = error?.error;
      const message = details.map((i) => i.message).join(",");

      return res.status(422).send({message : `Validation Error : ${message}`});
    }
  };
};

module.exports = validateRequest;
