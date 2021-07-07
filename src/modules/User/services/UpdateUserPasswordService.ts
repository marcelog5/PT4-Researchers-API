import { getRepository } from 'typeorm';
import { hash, compare } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '@modules/User/infra/typeorm/entities/User';

interface Request {
  id: string;
  password: string;
  newPassword: string;
}

interface Response {
  status: string;
}

class UpdateUserPasswordService {
  public async execute({
    id,
    password,
    newPassword,
  }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: [{ id }],
    });

    if (!checkUserExists) {
      throw new AppError('User not exist.');
    }

    const passwordMatched = await compare(password, checkUserExists.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect password.', 401);
    }

    const hashedPassword = await hash(newPassword, 8);

    usersRepository.update(id, {
      password: hashedPassword,
    });

    return { status: 'Sucess password changed' };
  }
}

export default UpdateUserPasswordService;
