import Joi from 'joi';
import { emailRegExp, passwordRegExp, nameRegExp } from '../constants/regExp.js';

const updateUserSchema = Joi.object({
  name: Joi.string().pattern(nameRegExp),
  email: Joi.string().pattern(emailRegExp),
  password: Joi.string().pattern(passwordRegExp),
});

export default updateUserSchema;
