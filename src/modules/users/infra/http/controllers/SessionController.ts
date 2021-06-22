import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '../../../services/AuthenticateUserService';

export default class SessionController {
  public create(request: Request, response: Response): Response {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);
    const { token, user } = authenticateUser.execute({
      email,
      password,
    });

    return response.json({
      user,
      token,
    });
  }
}
