import express from 'express';
import { addBoard, deleteBoard, updateBoard, getAllBoards, getBoardById } from '../../controllers/boards/index.js';
import { isValidId, authenticate } from '../../middlewares/index.js';

const boardRouter = express.Router();

boardRouter.post('/', authenticate, addBoard.addBoard);
boardRouter.delete('/:id', authenticate, isValidId, deleteBoard.deleteBoard);
boardRouter.put('/:id', authenticate, isValidId, updateBoard.updateBoard);
boardRouter.get('/', authenticate, getAllBoards.getAllBoards);
boardRouter.get('/:id', authenticate, getBoardById.getBoardById);

export default boardRouter;
