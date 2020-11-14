/* eslint-disable camelcase */
import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

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

    return response.json({
      id: user.id,
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
