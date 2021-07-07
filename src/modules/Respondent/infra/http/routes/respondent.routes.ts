/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import ensureAuthenticated from '@modules/User/infra/http/middlewares/ensureAuthenticated';

import Respondent from '@modules/Respondent/infra/typeorm/entities/Respondent';
import CreateRespondentService from '@modules/Respondent/services/CreateRespondentService';

const respondentsRouter = Router();

respondentsRouter.get('/', ensureAuthenticated, async (request, response) => {
  const respondentsRepository = getRepository(Respondent);
  const respondents = await respondentsRepository.find();

  return response.json(respondents);
});

respondentsRouter.get(
  '/:form_id',
  ensureAuthenticated,
  async (request, response) => {
    try {
      const { form_id } = request.params;

      const respondentsRepository = getRepository(Respondent);

      const respondents = await respondentsRepository.find({
        where: {
          form_id,
        },
      });

      return response.json(respondents);
    } catch {
      return response.json({ message: 'There is no respondent.' });
    }
  },
);

respondentsRouter.post('/', async (request, response) => {
  const {
    gender,
    schooling,
    age,
    state,
    questionsAnswer,
    form_id,
  } = request.body;

  const createRespondent = new CreateRespondentService();

  const respondents = await createRespondent.execute({
    gender,
    schooling,
    age,
    state,
    questionsAnswer,
    form_id,
  });

  return response.json(respondents);
});

export default respondentsRouter;
