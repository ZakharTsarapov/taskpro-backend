import Task from '../../models/task-model.js';
import { ctrlWrapper } from '../../decorators/index.js';

const deleteTask = async (req, res) => {
  const { id } = req.params;

  const result = await Task.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, 'Not Found');
  }
  res.status(201).json({
    message: 'Task deleted',
  });
};

export default { deleteTask: ctrlWrapper(deleteTask)};
