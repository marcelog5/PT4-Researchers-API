/* eslint-disable camelcase */
import { Router } from 'express';

import { getRepository } from 'typeorm';

import Users from '../models/User';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.get('/', async (request, response) => {
  const usersRepository = getRepository(Users);
  const users = await usersRepository.find();

  return response.json(users);
});

usersRouter.post('/', async (request, response) => {
  try {
    const {
      name,
      email,
      password,
      gender,
      age,
      institution,
      orcid,
      lattes,
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
    });

    user.password = '';

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
