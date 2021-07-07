/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Inventory from '@modules/Inventory/infra/typeorm/entities/Inventory';

interface Request {
  author: string;
  numberOfQuestions: number;
  inventoryName: string;
}

class CreateQuestionService {
  public async execute({
    author,
    numberOfQuestions,
    inventoryName,
  }: Request): Promise<Inventory> {
    const inventoriesRepository = getRepository(Inventory);

    const inventories = inventoriesRepository.create({
      author,
      numberOfQuestions,
      inventoryName,
    });

    await inventoriesRepository.save(inventories);

    return inventories;
  }
}

export default CreateQuestionService;
