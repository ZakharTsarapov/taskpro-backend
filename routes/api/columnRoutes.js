import express from 'express';
import { isValidId, authenticate } from '../../middlewares/index.js';
import {
  addColumn,
  deleteColumn,
  updateColumn,
  getAllColumns,
  getColumnById,
} from '../../controllers/columns/index.js';

const columnRouter = express.Router();

columnRouter.post('/', authenticate, addColumn.addColumn);

columnRouter.delete('/:id', authenticate, isValidId, deleteColumn.deleteColumn);
columnRouter.put('/:id', authenticate, isValidId, updateColumn.updateColumn);
columnRouter.get('/', authenticate, getAllColumns.getAllColumns);
columnRouter.get('/:id', authenticate, getColumnById.getColumnById);
export default columnRouter;
