import express from 'express';
import authCtrl from '../controllers/authCtrl';
const authRouter = express.Router();
import { authenticate, isEmptyBody } from '../../middlewares/index.js';
import { upload } from '../../middlewares/upload.js';
import updateAvatar from '../../controllers/authCtrl/updateAvatar';

authRouter.get('/current', authenticate, authCtrl.getCurrent);

authRouter.post('/avatar', isEmptyBody, upload.single('avatar'), updateAvatar); // {avatar: avatar.jpg} - поле от фронта

export default authRouter;
