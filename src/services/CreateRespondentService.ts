/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Respondent from '../models/Respondent';

interface Request {
  gender: string;
  schooling: string;
  age: Date;
  state: string;
  questionsAnswer: number[];
  form_id: string;
}

class CreateRespondentService {
  public async execute({
    gender,
    schooling,
    age,
    state,
    questionsAnswer,
    form_id,
  }: Request): Promise<Respondent> {
    const respondentsRepository = getRepository(Respondent);

    const respondents = respondentsRepository.create({
      gender,
      schooling,
      age,
      state,
      questionsAnswer,
      form_id,
    });

    await respondentsRepository.save(respondents);

    return respondents;
  }
}

export default CreateRespondentService;
