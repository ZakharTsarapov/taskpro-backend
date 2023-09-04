import  Board  from '../../models/board-model.js';
import Column from "../../models/column-model.js"
import { ctrlWrapper } from '../../decorators/index.js';
import { HttpError } from '../../helpers/index.js';

const getBoardById = async (req, res) => {
  const { id } = req.params;

  const { _id: owner } = req.user;
  const result = await Board.findById({ _id: id, owner });

  const columns = await Column.find({ board: result._id });
  let columnsWithCards = [];

  if (columns.length > 0) {
    columnsWithCards = await Column.aggregate([
      {
        $match: { $or: columns },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "taskOwner",
          as: "tasks",
        },
      },
    ]);
  }

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json({
    status: 'success',
    code: 200,
    result,
    columns: columnsWithCards,
  });
};


export default { getBoardById: ctrlWrapper(getBoardById) };
