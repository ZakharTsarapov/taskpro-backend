import express from 'express';
import authCtrl from '../controllers/authCtrl';
const authRouter = express.Router();
import { authenticate } from '../../middlewares/index.js';

authRouter.get('/current', authenticate, authCtrl.getCurrent);

export default authRouter;
