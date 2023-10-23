import Board from '../../models/board-model.js';
import Column from '../../models/column-model.js';
import { BadRequestError, HttpError } from '../../helpers/index.js';
import { ctrlWrapper } from '../../decorators/index.js';
import columnSchemas from '../../shemas/column-schema.js';

const updateColumn = async (req, res) => {
  const { value, error } = columnSchemas.updateColumnSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    BadRequestError(error);
  }

  const { id } = req.params;
  const { title, taskOrder } = value;
  const result = await Column.findByIdAndUpdate(id, { title, taskOrder }, { new: true });
  if (!result) {
    throw HttpError(404, `Column ${id} not found`);
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    message: `Column ${id} updated successfully`,
    result,
  });
};

export default { updateColumn: ctrlWrapper(updateColumn) };
