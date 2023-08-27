import  Board  from '../../models/board-model.js';
import  boardSchemas  from '../../shemas/board-schema.js';
import { BadRequestError } from '../../helpers/index.js';
import { ctrlWrapper } from '../../decorators/index.js';

const addBoard = async (req, res) => {
  const { value, error } = boardSchemas.addBoardSchema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    BadRequestError(error);
  }

  const { _id: owner } = req.user;
  const result = await Board.create({ ...value, owner });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result },
  });
};

export default { addBoard: ctrlWrapper(addBoard) };
