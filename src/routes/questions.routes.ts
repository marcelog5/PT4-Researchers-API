import { Router } from 'express';
import { getRepository } from 'typeorm';

import Questions from '../models/Question';
import CreateQuestionService from '../services/CreateQuestionService';

const questionsRouter = Router();

questionsRouter.get('/', async (request, response) => {
  const questionsRepository = getRepository(Questions);
  const questions = await questionsRepository.find();

  return response.json(questions);
});

questionsRouter.post('/', async (request, response) => {
  const { question, inverted, trait, factor } = request.body;

  const createQuestion = new CreateQuestionService();

  const questionInfor = await createQuestion.execute({
    question,
    inverted,
    trait,
    factor,
  });

  return response.json(questionInfor);
});

export default questionsRouter;
