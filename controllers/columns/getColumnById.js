import Column from '../../models/column-model.js';
import { ctrlWrapper } from '../../decorators/index.js';
import { HttpError } from '../../helpers/index.js';

const getColumnById = async (req, res) => {
  const { id } = req.params;

  const { _id: owner } = req.user;
  const result = await Column.findById({ _id: id, owner });

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

export default { getColumnById: ctrlWrapper(getColumnById) };
