/* eslint-disable camelcase */
import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const {
    name,
    email,
    password,
    gender,
    age,
    institution,
    orcid,
    lattes,
    isAdmin,
  } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
    gender,
    age,
    institution,
    orcid,
    lattes,
    isAdmin,
  });

  return response.json({
    id: user.id,
  });
});

export default usersRouter;
