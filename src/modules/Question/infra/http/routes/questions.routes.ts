/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import Questions from '@modules/Question/infra/typeorm/entities/Question';
import CreateQuestionService from '@modules/Question/services/CreateQuestionService';

import ensureAuthenticated from '@modules/User/infra/http/middlewares/ensureAuthenticated';

const questionsRouter = Router();

questionsRouter.get('/', async (request, response) => {
  const questionsRepository = getRepository(Questions);
  const questions = await questionsRepository.find();

  return response.json(questions);
});

questionsRouter.post('/', ensureAuthenticated, async (request, response) => {
  const {
    question,
    inverted,
    trait,
    factor,
    questionNumber,
    inventory_id,
  } = request.body;

  const createQuestion = new CreateQuestionService();

  const questions = await createQuestion.execute({
    question,
    inverted,
    trait,
    factor,
    questionNumber,
    inventory_id,
  });

  return response.json(questions);
});

export default questionsRouter;
