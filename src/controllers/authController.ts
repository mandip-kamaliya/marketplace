import { Request, Response } from 'express';
import { User } from '../models/User';
import { signToken } from '../services/authService';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  if (!email || !password) return res.status(400).json({ message: 'email and password required' });

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await user.validatePassword(password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken(user);
  return res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
};
