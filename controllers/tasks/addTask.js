import { ctrlWrapper } from '../../decorators/index.js';
import { HttpError } from '../../helpers/index.js';
import Column from '../../models/column-model.js';
import Task from '../../models/task-model.js';

const addTask = async (req, res) => {
  

 const { taskOwner } = req.body;
  const result = await Task.create({ ...req.body });
  await Column.findByIdAndUpdate(taskOwner, { $push: { taskOrder: result._id } });
  if (!result) {
    throw HttpError(400, 'Bad Request');
  }

  res.status(201).json(result);
};

export default {addTask: ctrlWrapper(addTask)};
