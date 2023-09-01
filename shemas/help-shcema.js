import Joi from 'joi';
import { emailRegExp } from '../constants/regExp.js';

const helpSchemas = Joi.object({
    email: Joi.string().pattern(emailRegExp).required(),
    comment: Joi.string().required(),
})

export default helpSchemas;