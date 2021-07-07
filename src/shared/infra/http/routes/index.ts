import { Router } from 'express';
import questionsRouter from '@modules/Question/infra/http/routes/questions.routes';
import formsRouter from '@modules/Form/infra/http/routes/forms.routes';
import inventoriesRouter from '@modules/Inventory/infra/http/routes/inventories.routes';
import respondentsRouter from '@modules/Respondent/infra/http/routes/respondent.routes';
import usersRouter from '@modules/User/infra/http/routes/users.routes';
import sessionsRouter from '@modules/User/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/questions', questionsRouter);
routes.use('/forms', formsRouter);
routes.use('/forms/:formId', formsRouter);
routes.use('/inventories', inventoriesRouter);
routes.use('/respondents', respondentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
