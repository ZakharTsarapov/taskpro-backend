import express from 'express';
import ctrl from '../../controllers/boards/index.js';
import { isValidId, authenticate, validateBody } from '../../middlewares/index.js';
import { boardSchemas } from '../../shemas/board-schema.js';

const boardRouter = express.Router();

boardRouter.post('/', authenticate, validateBody(boardSchemas.addBoardSchema), ctrl.addBoard);

export default boardRouter;
