import Column from '../../models/column-model.js';

import { ctrlWrapper } from '../../decorators/index.js';

const getAllColumns = async (req, res) => {
  const { id: board } = req.params;

  const result = await Column.find({ board });
  res.json(result);
};

export default { getAllColumns: ctrlWrapper(getAllColumns) };
