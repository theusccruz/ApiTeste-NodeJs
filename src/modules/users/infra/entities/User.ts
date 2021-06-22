import { v4 as uuid } from 'uuid';

export default class User {
  id: string;

  email: string;

  password: string;

  constructor({ email, password }: Omit<User, 'id'>) {
    this.email = email;
    this.password = password;
    this.id = uuid();
  }
}
