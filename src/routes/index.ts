import { Router } from 'express';
import questionsRouter from './questions.routes';
import formsRouter from './forms.routes';
import inventoriesRouter from './inventories.routes';
import respondentsRouter from './respondent.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/questions', questionsRouter);
routes.use('/forms', formsRouter);
routes.use('/forms/:formId', formsRouter);
routes.use('/inventories', inventoriesRouter);
routes.use('/respondents', respondentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
