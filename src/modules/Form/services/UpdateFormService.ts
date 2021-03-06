/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Form from '@modules/Form/infra/typeorm/entities/Form';

import AppError from '@shared/errors/AppError';

interface Request {
  id: string;
  name: string;
  link: string;
  term: string;
}

interface Response {
  status: string;
}

class CreateQuestionService {
  public async execute({ id, name, link, term }: Request): Promise<Response> {
    const formsRepository = getRepository(Form);

    const checkFormExists = await formsRepository.findOne({
      where: [{ id }],
    });

    if (!checkFormExists) {
      throw new AppError('User not exist.');
    }

    formsRepository.update(id, {
      name,
      link,
      term,
    });

    return { status: 'Sucess on update' };
  }
}

export default CreateQuestionService;
