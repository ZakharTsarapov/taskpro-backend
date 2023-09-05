import Joi from 'joi';
import { priorities } from '../constants/arrays.js';

const addTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  priority: Joi.string().valid(...priorities),
  deadLine: Joi.string(),
  taskOwner: Joi.string().required(),
});

const updateTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  priority: Joi.string().valid(...priorities),
  deadLine: Joi.date(),
  taskOwner: Joi.string(),
});

const taskSchemas = {
  addTaskSchema,
  updateTaskSchema,
};

export default taskSchemas;
