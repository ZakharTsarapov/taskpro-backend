import { ctrlWrapper } from '../../decorators/index.js';
import { HttpError } from '../../helpers/index.js';
import Task from '../../models/task-model.js';

const addTask = async (req, res) => {
  const { id: taskOwner } = req.params;

  const result = await Task.create({ ...req.body, taskOwner });
  if (!result) {
    throw HttpError(400, 'Bad Request');
  }

  res.status(201).json(result);
};

export default {addTask: ctrlWrapper(addTask)};
