import { inject, injectable } from 'tsyringe';

import { sign } from 'jsonwebtoken';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/entities/User';
import authConfig from '../../../config/auth';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponseDTO {
  user: User;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public execute({ email, password }: IRequestDTO): IResponseDTO {
    const user = this.usersRepository.findByEmail(email);
    if (!user) {
      throw new Error('Incorrect email/password combination');
    }

    if (password !== user.password) {
      throw new Error('Incorrect email/password combination');
    }

    const { expiresIn, secret } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
