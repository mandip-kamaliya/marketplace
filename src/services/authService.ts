import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { User } from '../models/User';

export type JwtPayload = { id: number; role: User['role']; email: string; name: string };

export function signToken(user: User) {
  const payload: JwtPayload = { id: user.id, role: user.role, email: user.email, name: user.name };
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
}
