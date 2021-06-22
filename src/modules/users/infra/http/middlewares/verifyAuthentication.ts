import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../../../../../config/auth';

interface ITokenPayload {
  iat: number; // criação
  exp: number; // expiração
  sub: string; // id user
}

export default function verifyAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new Error('Token JWT is missing');
  }

  const [, token] = authHeader.split(' ');
  const { secret } = authConfig.jwt;

  try {
    const decoded = verify(token, secret);
    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    next();
  } catch (error) {
    throw new Error('Invalid JWT Token');
  }
}
