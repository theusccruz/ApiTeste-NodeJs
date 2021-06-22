import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/entities/User';

export default interface IUsersRepository {
  findById(user_id: string): User | undefined;
  findByEmail(email: string): User | undefined;
  create(data: ICreateUserDTO): User;
  save(user: User): User;
  delete(user_id: string): void;
}
