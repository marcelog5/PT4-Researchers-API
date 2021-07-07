import { getRepository } from 'typeorm';
import { createTransport } from 'nodemailer';
import { hash } from 'bcryptjs';

import MailConfig from '@config/mail';
import AppError from '@shared/errors/AppError';

import User from '@modules/User/infra/typeorm/entities/User';

interface Request {
  email: string;
}

interface Response {
  status: string;
}

class UpdateUserForgotPasswordService {
  public async execute({ email }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: [{ email }],
    });

    if (!checkUserExists) {
      throw new AppError('User not exist.');
    }

    const password =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

    const mailOptions = {
      from: MailConfig.user,
      to: email,
      subject: 'Senha do PT4-Researchers',
      html: `<p>${password}<p>`,
    };

    const transporter = createTransport({
      host: MailConfig.host,
      port: MailConfig.port,
      secure: false,
      auth: {
        user: MailConfig.user,
        pass: MailConfig.password,
      },
      tls: { rejectUnauthorized: false },
    });

    transporter.sendMail(mailOptions);

    const hashedPassword = await hash(password, 8);

    usersRepository.update(checkUserExists.id, {
      password: hashedPassword,
    });

    return { status: 'Sucess Email send' };
  }
}

export default UpdateUserForgotPasswordService;
