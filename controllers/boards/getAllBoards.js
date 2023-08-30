import Board from '../../models/board-model.js';
import { ctrlWrapper } from '../../decorators/index.js';

const getAllBoards = async (req, res) => {
  const { _id: owner } = req.user;
  const { board } = req.params;

  const result = await Board.find({ board }, '-createdAt -updatedAt').populate('owner', 'title icon background ');
  res.json({
    status: 'success',
    code: 200,
    message: 'Boards successfully received',
    boards: result,
  });
};

export default { getAllBoards: ctrlWrapper(getAllBoards) };
