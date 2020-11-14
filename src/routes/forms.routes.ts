/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import Forms from '../models/Form';
import CreateFormService from '../services/CreateFormService';

const formsRouter = Router();

formsRouter.get('/', async (request, response) => {
  const formsRepository = getRepository(Forms);
  const forms = await formsRepository.find();

  return response.json(forms);
});

formsRouter.get('/:formId', async (request, response) => {
  try {
    const { formId } = request.params;

    const formsRepository = getRepository(Forms);

    const form = await formsRepository.findOneOrFail({
      where: {
        id: formId,
      },
    });

    return response.json(form);
  } catch (e) {
    return response.json({ message: 'Form not found.' });
  }
});

formsRouter.post('/', async (request, response) => {
  try {
    const { name, link, term, inventory_id, user_id } = request.body;

    const createForm = new CreateFormService();

    const forms = await createForm.execute({
      name,
      link,
      term,
      inventory_id,
      user_id,
    });

    return response.json(forms);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default formsRouter;
