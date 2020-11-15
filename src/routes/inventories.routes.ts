/* eslint-disable camelcase */
import { Router } from 'express';
import { getRepository } from 'typeorm';

import Inventories from '../models/Inventory';
import CreateInventoryService from '../services/CreateInventoryService';

const inventoriesRouter = Router();

inventoriesRouter.get('/', async (request, response) => {
  const inventoriesRepository = getRepository(Inventories);
  const inventories = await inventoriesRepository.find();

  return response.json(inventories);
});

inventoriesRouter.post('/', async (request, response) => {
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
