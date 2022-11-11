const Joi = require("joi");
const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(7).max(32).required(),
  name: Joi.string().required(),
  location: Joi.string().required(),
  phone: Joi.string().required(),
});
module.exports = {
  registerSchema,
};
