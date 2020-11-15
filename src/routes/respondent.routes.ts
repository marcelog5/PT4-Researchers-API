/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import Respondent from '../models/Respondent';
import CreateRespondentService from '../services/CreateRespondentService';

const respondentsRouter = Router();

respondentsRouter.get('/', async (request, response) => {
  const respondentsRepository = getRepository(Respondent);
  const respondents = await respondentsRepository.find();

  return response.json(respondents);
});

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
