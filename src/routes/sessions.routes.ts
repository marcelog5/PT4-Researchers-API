/* eslint-disable camelcase */
import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    gender: user.gender,
    age: user.age,
    institution: user.institution,
    orcid: user.orcid,
    lattes: user.lattes,
    state: user.state,
    schooling: user.schooling,
    isAdmin: user.isAdmin,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return response.json({ userData, token });
});

export default sessionsRouter;
