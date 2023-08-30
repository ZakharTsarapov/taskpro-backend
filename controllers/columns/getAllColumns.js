import Column from '../../models/column-model.js';

import { ctrlWrapper } from '../../decorators/index.js';

const getAllColumns = async (req, res) => {
  const { column } = req.params;

  const result = await Column.find({ column }, '-createdAt -updatedAt').populate('board', 'title ');
  res.json({
    status: 'success',
    code: 200,
    message: 'Columns successfully received',
    columns: result,
  });
};

export default { getAllColumns: ctrlWrapper(getAllColumns) };
