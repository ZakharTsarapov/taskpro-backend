import  Board  from '../../models/board-model.js';
import { ctrlWrapper } from '../../decorators/index.js';
import { HttpError } from '../../helpers/index.js';

const getBoardById = async (req, res) => {
  const { id } = req.params;

  const { _id: owner } = req.user;
  const result = await Board.findById({ _id: id, owner });

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

export default { getBoardById: ctrlWrapper(getBoardById) };
