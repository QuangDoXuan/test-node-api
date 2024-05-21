import { Router } from 'express';
import { AuthController } from './controller';

const authRouter: Router = Router();
const authController = new AuthController();

authRouter.post('/auth/login', (req, res) => authController.login(req, res));

export default authRouter;
