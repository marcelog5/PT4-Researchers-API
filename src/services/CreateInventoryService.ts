/* eslint-disable camelcase */
import { getRepository } from 'typeorm';

import Inventory from '../models/Inventory';

interface Request {
  author: string;
  numberOfQuestions: number;
}

class CreateQuestionService {
  public async execute({
    author,
    numberOfQuestions,
  }: Request): Promise<Inventory> {
    const inventoriesRepository = getRepository(Inventory);

    const inventories = inventoriesRepository.create({
      author,
      numberOfQuestions,
    });

    await inventoriesRepository.save(inventories);

    return inventories;
  }
}

export default CreateQuestionService;
