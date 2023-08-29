import Joi from 'joi';
import objectId from 'joi-objectid';

const addColumnSchema = Joi.object({
  title: Joi.string().required(),
  board: objectId(Joi),
  index: Joi.number().required(),
});

const updateColumnSchema = Joi.object({
  title: Joi.string().required(),
});

const columnSchemas = { addColumnSchema, updateColumnSchema };
export default columnSchemas;
