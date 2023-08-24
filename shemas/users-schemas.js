import Joi from 'joi';

import { emailRegExp, passwordRegExp, nameRegExp, deadlineRegExp } from '../constants/regExp.js';

const userSignupSchema = Joi.object({
  name: Joi.string().pattern(nameRegExp).required(),
  password: Joi.string().pattern(passwordRegExp).required(),
  email: Joi.string().pattern(emailRegExp).required(),
});

const userSigninSchema = Joi.object({
  password: Joi.string().pattern(passwordRegExp).required(),
  email: Joi.string().pattern(emailRegExp).required(),
});

export default {
    userSignupSchema,
    userSigninSchema,
};
