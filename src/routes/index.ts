import { Router } from 'express';
import questionsRouter from './questions.routes';
import formsRouter from './forms.routes';
import inventoriesRouter from './inventories.routes';

const routes = Router();

routes.use('/questions', questionsRouter);
routes.use('/forms', formsRouter);
routes.use('/inventories', inventoriesRouter);

export default routes;
