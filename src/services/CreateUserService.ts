import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
  gender: string;
  age: Date;
  institution: string;
  orcid: string;
  lattes: string;
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
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: [{ email }, { lattes }, { orcid }],
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
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
