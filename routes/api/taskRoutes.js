import express from 'express';
import { authenticate, isValidId } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import taskSchemas from '../../shemas/task-schema.js';
import { getAllTasks, addTask, deleteTask, updateTask } from '../../controllers/tasks/index.js';

const taskRouter = express.Router();

taskRouter.post('/', authenticate, validateBody(taskSchemas.addTaskSchema), addTask.addTask); // іd columns

taskRouter.get('/:id', authenticate, isValidId, getAllTasks.getAllTasks); // іd columns

taskRouter.delete('/:id', authenticate, isValidId, deleteTask.deleteTask); // id task

taskRouter.patch('/:id', authenticate, isValidId, validateBody(taskSchemas.updateTaskSchema), updateTask.updateTask); // id task

export default taskRouter;
