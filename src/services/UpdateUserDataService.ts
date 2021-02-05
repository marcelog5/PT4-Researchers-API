import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  id: string;
  name: string;
  email: string;
  gender: string;
  age: Date;
  institution: string;
  orcid: string;
  lattes: string;
  state: string;
  schooling: string;
}

interface Response {
  status: string;
}

class UpdateUserDataService {
  public async execute({
    id,
    name,
    email,
    gender,
    age,
    institution,
    orcid,
    lattes,
    state,
    schooling,
  }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: [{ id }],
    });

    if (!checkUserExists) {
      throw new AppError('User not exist.');
    }

    usersRepository.update(id, {
      name,
      email,
      gender,
      age,
      institution,
      orcid,
      lattes,
      state,
      schooling,
    });

    return { status: 'Sucess on update' };
  }
}

export default UpdateUserDataService;
