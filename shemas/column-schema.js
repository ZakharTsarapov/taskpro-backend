import Joi from 'joi';

const addColumnShema = Joi.object({
  title: Joi.string().required(),
  //   board: Joi.string(),
  index: Joi.number().required(),
});

const updateColumnSchema = Joi.object({
  title: Joi.string().required(),
});
