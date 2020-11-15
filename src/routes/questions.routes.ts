/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import Questions from '../models/Question';
import CreateQuestionService from '../services/CreateQuestionService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

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
