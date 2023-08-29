import Board from '../../models/board-model.js';
import Column from '../../models/column-model.js';
import { ctrlWrapper } from '../../decorators/index.js';
import HttpError from '../../helpers/HttpError.js';

const deleteColumn = async (req, res) => {
  const { id } = req.params;
  const result = await Column.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, `Column ${id} not found`);
  }

  await Board.findByIdAndUpdate(result.board, { $pull: { columnOrder: result._id } });

  res.status(200).json({
    status: 'success',
    code: 200,
    message: `Column ${id} deleted successfully`,
    result,
  });
};

export default { deleteColumn: ctrlWrapper(deleteColumn) };
