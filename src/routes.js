import { Router } from 'express';
import AdminController from './app/controllers/AdminController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.post('/users', AdminController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', AdminController.update);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.post('/plans', PlanController.store);
export default routes;
