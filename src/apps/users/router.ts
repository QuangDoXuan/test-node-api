import { Router } from 'express';
import { UserController } from './controller';
import { authenticateJWT } from '../../middlewares/auth-middleware';

const userRouter: Router = Router();
const userController = new UserController();

userRouter.post('/users/register', (req, res) => userController.register(req, res));
userRouter.get('/users/profile', authenticateJWT, (req: any, res) => userController.getProfile(req, res));

export default userRouter;
