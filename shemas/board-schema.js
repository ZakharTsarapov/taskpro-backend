import Joi from 'joi';
import { array } from '../../constants/arrays.js';

const addBoardSchema = Joi.object({
  title: Joi.string().required(),
  icon: Joi.string.valid(...array.icons),
  background: Joi.string()
    .valid(...array.backgrounds)
    .allow(null),
});

const updateBoardSchema = Joi.object({
  title: Joi.string(),
  icon: Joi.string().valid(...array.icons),
  background: Joi.string()
    .valid(...array.backgrounds)
    .allow(null),
});

const boardSchemas = { addBoardSchema, updateBoardSchema };

export default boardSchemas;