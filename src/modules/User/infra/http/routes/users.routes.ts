/* eslint-disable camelcase */
import { Router } from 'express';

import CreateUserService from '@modules/User/services/CreateUserService';
import UpdateUserDataService from '@modules/User/services/UpdateUserDataService';
import UpdateUserForgotPasswordService from '@modules/User/services/UpdateUserForgotPasswordService';
import UpdateUserPasswordService from '@modules/User/services/UpdateUserPasswordService';

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

usersRouter.put('/changepassword', async (request, response) => {
  const { id, password, newPassword } = request.body;

  const updateUser = new UpdateUserPasswordService();

  const status = await updateUser.execute({
    id,
    password,
    newPassword,
  });

  return response.json({
    status,
  });
});

usersRouter.put('/sendforgotpassword', async (request, response) => {
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
