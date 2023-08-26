import express from 'express';
import ctrl from '../../controllers/boards/index.js';
import { isValidId, authenticate } from '../../middlewares/index.js';

const boardRouter = express.Router();

boardRouter.post('/', authenticate, ctrl.addBoard);
boardRouter.delete('/:id', authenticate, isValidId, ctrl.deleteBoard);
boardRouter.put('/:id', authenticate, isValidId, ctrl.updateBoard);
boardRouter.get('/', authenticate, ctrl.getAllBoards);
boardRouter.get('/:id', authenticate, ctrl.getBoardById);

export default boardRouter;
