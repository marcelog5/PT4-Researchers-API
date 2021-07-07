import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '@modules/User/infra/typeorm/entities/User';

interface Request {
  name: string;
  email: string;
  password: string;
  gender: string;
  age: Date;
  institution: string;
  orcid: string;
  lattes: string;
  state: string;
  schooling: string;
  isAdmin: boolean;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    gender,
    age,
    institution,
    orcid,
    lattes,
    state,
    schooling,
    isAdmin,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: [{ email }],
    });

    if (checkUserExists) {
      throw new AppError('User already exist.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      gender,
      age,
      institution,
      orcid,
      lattes,
      state,
      schooling,
      isAdmin,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
