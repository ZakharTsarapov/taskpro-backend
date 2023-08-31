import express from 'express';
import { addBoard, deleteBoard, updateBoard, getAllBoards, getBoardById } from '../../controllers/boards/index.js';
import { isValidId, authenticate } from '../../middlewares/index.js';

const boardRouter = express.Router();

boardRouter.use(authenticate);

boardRouter.post('/', addBoard.addBoard);
boardRouter.delete('/:id', isValidId, deleteBoard.deleteBoard);
boardRouter.put('/:id', isValidId, updateBoard.updateBoard);
boardRouter.get('/', getAllBoards.getAllBoards);
boardRouter.get('/:id', getBoardById.getBoardById);

export default boardRouter;
