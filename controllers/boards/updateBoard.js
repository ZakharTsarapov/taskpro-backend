import { Board } from '../../models/board-model.js';
import { boardSchemas } from '../../shemas/board-schema.js';
import { ctrlWrapper } from '../../decorators/index.js';
import { BadRequestError } from '../../helpers/index.js';

const updateBoard = async (req, res) => {
  const { value, error } = boardSchemas.updateBoardSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    BadRequestError(error);
  }

  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Board.findByIdAndUpdate({ _id: id, owner }, value, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
};

export default { updateBoard: ctrlWrapper(updateBoard) };
