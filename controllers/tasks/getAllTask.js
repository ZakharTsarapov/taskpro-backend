import Task from '../../models/task-model.js';
import { ctrlWrapper } from '../../decorators/index.js';

const getAllTasks = async (req, res) => {
  const { id: taskOwner } = req.params;
  const result = await Task.find({ taskOwner });

  if (!result) {
    throw HttpError(404, 'Not Found');
  }

  res.status(200).json(result);
};

export default {getAllTasks: ctrlWrapper(getAllTasks)};
