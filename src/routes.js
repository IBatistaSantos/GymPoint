import { Router } from 'express';
import AdminController from './app/controllers/AdminController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import ManagementController from './app/controllers/ManagementController';
import CheckinsController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import HelpOrderUserController from './app/controllers/HelpOrderUserController';
import AnswerController from './app/controllers/AnswerController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.post('/users', AdminController.store);
routes.post('/sessions', SessionController.store);

// Rotas  que não precisa de autenticação, pedido de auxílio.
routes.post('/students/:id/help-orders', HelpOrderController.store);
routes.get('/students/help-orders', HelpOrderController.index);
// Rota para atualização da pergunta
routes.put('/students/:id/help-orders', HelpOrderController.update);
// Rota para listagem de auxílio por estudante
routes.get('/students/:id/help-orders', HelpOrderUserController.index);
// Rotas  que não precisa de autenticação, checkins
routes.post('/students/:id/checkins', CheckinsController.store);
routes.get('/students/:id/checkins', CheckinsController.index);

routes.use(authMiddleware);
routes.put('/users', AdminController.update);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plans/:id', PlanController.update);

routes.post('/managements', ManagementController.store);
routes.put('/managements/:id', ManagementController.update);
routes.get('/managements', ManagementController.index);
routes.delete('/managements/:id', ManagementController.delete);

routes.post('/help-orders/:id/answer', AnswerController.store);
export default routes;
