const Joi = require("joi");

const registerValidator = Joi.object({
  name: Joi.string()
    .required()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s\-'\.]+$/)
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name must be less than 50 characters',
      'string.pattern.base': 'Name can only contain letters, spaces, hyphens, apostrophes, and periods'
    }),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .min(6)
    .max(100)
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters',
      'string.max': 'Password must be less than 100 characters'
    }),
  role: Joi.string().optional(), // optional if you want default to "user"
});

const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { registerValidator, loginValidator };
