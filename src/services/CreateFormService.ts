/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Form from '../models/Form';

interface Request {
  name: string;
  link: string;
  term: string;
  inventory_id: string;
}

class CreateQuestionService {
  public async execute({
    name,
    link,
    term,
    inventory_id,
  }: Request): Promise<Form> {
    const formsRepository = getRepository(Form);

    const forms = formsRepository.create({
      name,
      link,
      term,
      inventory_id,
    });

    await formsRepository.save(forms);

    return forms;
  }
}

export default CreateQuestionService;
