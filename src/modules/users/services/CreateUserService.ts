import { inject, injectable } from 'tsyringe';

import User from '../infra/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  email: string;
  password: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public execute({ email, password }: IRequestDTO): User {
    const findUserWithSameEmail = this.usersRepository.findByEmail(email);
    if (findUserWithSameEmail) {
      throw new Error('This email is used by another user');
    }

    const user = this.usersRepository.create({
      email,
      password,
    });

    return user;
  }
}
