import Task from '../../models/task-model.js';

const updateTask = async (req, res) => {
  const { id } = req.params;
  const result = await Task.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, 'Not Found');
  }
  res.status(200).json(result);
};

export default updateTask;
