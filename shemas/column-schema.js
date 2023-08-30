import Joi from 'joi';

const addColumnSchema = Joi.object({
  title: Joi.string().required(),

  index: Joi.number().required(),
  board: Joi.string().required(),
});

const updateColumnSchema = Joi.object({
  title: Joi.string().required(),
});

const columnSchemas = { addColumnSchema, updateColumnSchema };
export default columnSchemas;
