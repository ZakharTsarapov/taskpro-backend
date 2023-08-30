import Column from '../../models/column-model.js';

import { ctrlWrapper } from '../../decorators/index.js';

const getAllColumns = async (req, res) => {
  const { _id: owner } = req.user;

  const result = await Column.find({ owner }, '-createdAt -updatedAt').populate('board', 'title ');
  res.json({
    status: 'success',
    code: 200,
    message: 'Columns successfully received',
    result,
  });
};

export default { getAllColumns: ctrlWrapper(getAllColumns) };
