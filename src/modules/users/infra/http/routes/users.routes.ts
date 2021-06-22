import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import verifyAuthentication from '../middlewares/verifyAuthentication';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.use(verifyAuthentication);

usersRouter.post('/', usersController.create);

export default usersRouter;
