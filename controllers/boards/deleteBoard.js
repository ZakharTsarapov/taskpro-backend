import { Board } from '../../models/board-model.js';
import { HttpError } from '../../helpers/index.js';
import { ctrlWrapper } from '../../decorators/index.js';

const deleteBoard = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Board.findByIdAndRemove({ _id: id, owner });

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Board deleted',
    data: result,
  });
};

export default { deleteBoard: ctrlWrapper(deleteBoard) };
