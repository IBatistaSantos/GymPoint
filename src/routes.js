import { Router } from 'express';
import AdminController from './app/controllers/AdminController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.post('/users', AdminController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
export default routes;
