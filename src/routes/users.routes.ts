/* eslint-disable camelcase */
import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';
import UpdateUserDataService from '../services/UpdateUserDataService';
import UpdateUserForgotPasswordService from '../services/UpdateUserForgotPasswordService';

const usersRouter = Router();

usersRouter.put('/userdata', async (request, response) => {
  const {
    id,
    name,
    email,
    gender,
    age,
    institution,
    orcid,
    lattes,
    state,
    schooling,
  } = request.body;

  const updateUser = new UpdateUserDataService();

  const status = await updateUser.execute({
    id,
    name,
    email,
    gender,
    age,
    institution,
    orcid,
    lattes,
    state,
    schooling,
  });

  return response.json({
    status,
  });
});

usersRouter.put('/sendpassword', async (request, response) => {
  const { email } = request.body;

  const updateUser = new UpdateUserForgotPasswordService();

  const status = await updateUser.execute({
    email,
  });

  return response.json({
    status,
  });
});

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
    state,
    schooling,
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
    state,
    schooling,
    isAdmin,
  });

  return response.json({
    id: user.id,
  });
});

export default usersRouter;
