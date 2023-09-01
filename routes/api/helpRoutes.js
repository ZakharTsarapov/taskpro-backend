import express from 'express';
import { validateBody } from '../../decorators/index.js';
import helpSchemas from '../../shemas/help-shcema.js';
import sendHelpEmail from '../../controllers/needHelp/sendEmail.js';

const helpRouter = express.Router();

helpRouter.post('/', validateBody(helpSchemas), sendHelpEmail.sendHelpEmail);

export default helpRouter;
