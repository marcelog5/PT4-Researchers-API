/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import Inventories from '@modules/Inventory/infra/typeorm/entities/Inventory';
import CreateInventoryService from '@modules/Inventory/services/CreateInventoryService';

import ensureAuthenticated from '@modules/User/infra/http/middlewares/ensureAuthenticated';

const inventoriesRouter = Router();

inventoriesRouter.get('/', async (request, response) => {
  const inventoriesRepository = getRepository(Inventories);
  const inventories = await inventoriesRepository.find();

  return response.json(inventories);
});

inventoriesRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { author, numberOfQuestions, inventoryName } = request.body;

  const createInventory = new CreateInventoryService();

  const inventories = await createInventory.execute({
    author,
    numberOfQuestions,
    inventoryName,
  });

  return response.json(inventories);
});

export default inventoriesRouter;
