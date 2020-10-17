import { Router } from 'express';
import questionsRouter from './questions.routes';

const routes = Router();

routes.use('/questions', questionsRouter);

export default routes;
