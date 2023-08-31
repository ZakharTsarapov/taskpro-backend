import express from 'express';
import authCtrl from '../../controllers/authCtrl/getCurrent.js';
import { authenticate, isEmptyBody, upload } from '../../middlewares/index.js';
import authControllers from '../../controllers/authCtrl/authControllers.js';
import usersSchemas from '../../shemas/users-schemas.js';
import { validateBody } from '../../decorators/index.js';
import updateAvatar from '../../controllers/authCtrl/updateAvatar.js';
import changeTheme from '../../controllers/authCtrl/changeTheme.js';
import updateCtrl from '../../controllers/authCtrl/updateDataUser.js';

const authRouter = express.Router();

authRouter.get('/current', authenticate, authCtrl.getCurrent);

authRouter.post('/signup', validateBody(usersSchemas.userSignupSchema), authControllers.signup);

authRouter.post('/signin', validateBody(usersSchemas.userSigninSchema), authControllers.signin);

authRouter.post('/signout', authenticate, authControllers.signout);

authRouter.post('/avatar', authenticate, upload.single('avatar'), updateAvatar.updateAvatar);

authRouter.put('/update', authenticate, upload.single('avatar'), updateCtrl.updateDataUser);

authRouter.patch('/themes', validateBody(usersSchemas.userChangeTheme), authenticate, changeTheme.changeTheme);

authRouter.post('/refresh', validateBody(usersSchemas.refreshSchema), authControllers.refresh);

export default authRouter;
