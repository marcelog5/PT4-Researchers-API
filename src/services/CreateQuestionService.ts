import { getRepository } from 'typeorm';

import Question from '../models/Question';

interface Request {
  question: string;
  inverted: boolean;
  trait: string;
  factor: string;
}

class CreateQuestionService {
  public async execute({
    question,
    inverted,
    trait,
    factor,
  }: Request): Promise<Question> {
    const questionsRepository = getRepository(Question);

    const questionInfor = questionsRepository.create({
      question,
      inverted,
      trait,
      factor,
    });

    await questionsRepository.save(questionInfor);

    return questionInfor;
  }
}

export default CreateQuestionService;
