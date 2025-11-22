import jwt, { Secret } from 'jsonwebtoken';
import { JwtPayload } from '../types';

export const generateToken = (payload: JwtPayload): string => {
  const secret: Secret = process.env.JWT_SECRET!;
  const tokenPayload = {
    userId: payload.userId,
    username: payload.username,
    email: payload.email
  };
  return jwt.sign(tokenPayload, secret, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

export const verifyToken = (token: string): JwtPayload => {
  const secret: Secret = process.env.JWT_SECRET!;
  return jwt.verify(token, secret) as JwtPayload;
};