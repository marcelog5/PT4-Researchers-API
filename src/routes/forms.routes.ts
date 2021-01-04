/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import Forms from '../models/Form';
import CreateFormService from '../services/CreateFormService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const formsRouter = Router();

formsRouter.get('/', ensureAuthenticated, async (request, response) => {
  const formsRepository = getRepository(Forms);
  const forms = await formsRepository.find();

  return response.json(forms);
});

formsRouter.get(
  '/findByUser/:user_id',
  ensureAuthenticated,
  async (request, response) => {
    try {
      const { user_id } = request.params;

      const formsRepository = getRepository(Forms);

      const forms = await formsRepository.find({
        where: {
          user_id,
        },
      });

      return response.json(forms);
    } catch {
      return response.json({ message: 'There is no forms.' });
    }
  },
);

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
  } catch {
    return response.json({ message: 'Form not found.' });
  }
});

formsRouter.post('/', ensureAuthenticated, async (request, response) => {
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
});

export default formsRouter;
