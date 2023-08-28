import Board from '../../models/board-model.js';
import Column from '../../models/column-model.js';
import { BadRequestError } from '../../helpers/index.js';
import { ctrlWrapper } from '../../decorators/index.js';
import columnSchemas from '../../shemas/column-schema.js';

const addColumn = async (req, res) => {
  const { value, error } = columnSchemas.addColumnSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    BadRequestError(error);
  }
  const { board } = value;
  const result = await Column.create({ ...value });
  await Board.findByIdAndUpdate(board, { $push: { columnOrder: result._id } });

  res.status(201).json({
    status: 'create',
    code: 201,
    message: 'Column created successfully',
    result,
  });
};

export default { addColumn: ctrlWrapper(addColumn) };
