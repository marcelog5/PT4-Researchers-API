/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Form from '@modules/Form/infra/typeorm/entities/Form';

interface Request {
  name: string;
  link: string;
  term: string;
  inventory_id: string;
  user_id: string;
}

class CreateQuestionService {
  public async execute({
    name,
    link,
    term,
    inventory_id,
    user_id,
  }: Request): Promise<Form> {
    const formsRepository = getRepository(Form);

    const forms = formsRepository.create({
      name,
      link,
      term,
      inventory_id,
      user_id,
    });

    await formsRepository.save(forms);

    return forms;
  }
}

export default CreateQuestionService;
