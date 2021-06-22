import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateUserService from '../../../services/CreateUserService';

export default class UsersController {
  public create(request: Request, response: Response): Response {
    const { email, password } = request.body;

    const createUserService = container.resolve(CreateUserService);
    const user = createUserService.execute({
      password,
      email,
    });

    return response.status(201).json(user);
  }
}
