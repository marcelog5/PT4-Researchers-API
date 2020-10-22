/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Question from '../models/Question';

interface Request {
  question: string;
  inverted: boolean;
  trait: string;
  factor: string;
  inventory_id: string;
}

class CreateQuestionService {
  public async execute({
    question,
    inverted,
    trait,
    factor,
    inventory_id,
  }: Request): Promise<Question> {
    const questionsRepository = getRepository(Question);

    const questions = questionsRepository.create({
      question,
      inverted,
      trait,
      factor,
      inventory_id,
    });

    await questionsRepository.save(questions);

    return questions;
  }
}

export default CreateQuestionService;
