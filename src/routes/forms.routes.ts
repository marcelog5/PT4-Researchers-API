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

formsRouter.post('/', async (request, response) => {
  const { name, link, term, inventory_id } = request.body;

  const createForm = new CreateFormService();

  const forms = await createForm.execute({
    name,
    link,
    term,
    inventory_id,
  });

  return response.json(forms);
});

export default formsRouter;