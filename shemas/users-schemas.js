import Joi from 'joi';

import { emailRegExp, passwordRegExp, nameRegExp, deadlineRegExp } from '../constants/regExp.js';
import { themes } from '../constants/arrays.js';

const userSignupSchema = Joi.object({
  name: Joi.string().pattern(nameRegExp).required(),
  password: Joi.string().pattern(passwordRegExp).required(),
  email: Joi.string().pattern(emailRegExp).required(),
  theme: Joi.string().valid(...themes),
});

const userSigninSchema = Joi.object({
  password: Joi.string().pattern(passwordRegExp).required(),
  email: Joi.string().pattern(emailRegExp).required(),
});

const userChangeTheme = Joi.object({
  theme: Joi.string()
    .valid(...themes)
    .required(),
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export default {
  userSignupSchema,
  userSigninSchema,
  userChangeTheme,
  refreshSchema,
};
