import Joi from 'joi';
import { icons, backgrounds } from '../constants/arrays.js';

const addBoardSchema = Joi.object({
  title: Joi.string().required(),
  icon: Joi.string().valid(...icons),
  background: Joi.string()
    .valid(...backgrounds)
    .allow(null),
});

const updateBoardSchema = Joi.object({
  title: Joi.string(),
  icon: Joi.string().valid(...icons),
  background: Joi.string()
    .valid(...backgrounds)
    .allow(null),
});

const boardSchemas = { addBoardSchema, updateBoardSchema };

export default boardSchemas;