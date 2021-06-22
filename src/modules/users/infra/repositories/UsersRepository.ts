import IUsersRepository from '../../repositories/IUsersRepository';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
  private users: User[] = [
    {
      id: '524a4379-3a2b-4c5b-ac40-40dff09ba2ad',
      email: 'matheus8476@outlook.com',
      password: '123456',
    },
  ];

  public create({ email, password }: ICreateUserDTO): User {
    const user = new User({
      email,
      password,
    });

    this.users.push(user);
    return user;
  }

  public findById(user_id: string): User | undefined {
    const user = this.users.find(findUser => {
      return findUser.id === user_id;
    });

    return user;
  }

  public findByEmail(email: string): User | undefined {
    const user = this.users.find(findUser => {
      return findUser.email === email;
    });

    return user;
  }

  public delete(user_id: string): void {
    const index = this.users.findIndex(user => {
      return user.id === user_id;
    });

    this.users.splice(index, 1);
  }

  public save(user: User): User {
    this.users.push(user);

    return user;
  }
}
