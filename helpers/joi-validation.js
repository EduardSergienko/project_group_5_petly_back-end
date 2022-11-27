const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(7).max(32).required(),
  name: Joi.string().required(),
  location: Joi.string().required(),
  phone: Joi.string()
    .pattern(/(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4}$)/)
    .required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(7).max(32).required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({ tlds: { allow: false } }),
  location: Joi.string().allow("").optional(),
  phone: Joi.string().pattern(
    /(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4}$)/
  ),
  dateOfBirth: Joi.string()
    .pattern(
      /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/
    )
    .allow("")
    .optional(),
  avatarURL: Joi.string(),
});

const noticeSchema = Joi.object({
  title: Joi.string().min(2).max(48).required(),
  petName: Joi.string().min(2).max(16).required(),
  birthDate: Joi.string()
    .pattern(
      /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:20)\d{2})\s*$/
    )
    .required(),
  breed: Joi.string().min(2).max(24).required(),
  sex: Joi.string().valid("male", "female").required(),
  location: Joi.string().required(),
  petImageUrl: Joi.any().required(),
  comments: Joi.string().min(8).max(120).required(),
  category: Joi.string().valid("sell", "lost-found", "for-free").required(),
  price: Joi.number().min(1).when("category", {
    is: "sell",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
});

const addAnimalJoiSchema = Joi.object({
  name: Joi.string().required(),
  birthDay: Joi.string()
    .pattern(
      /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:20)\d{2})\s*$/
    )
    .required(),
  breed: Joi.string().required(),
  comments: Joi.string().required(),
  petImageUrl: Joi.any().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  noticeSchema,
  updateUserSchema,
  addAnimalJoiSchema,
};
