import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

// Extend the Express Request type to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export interface AuthRequest extends Request {
  user?: User;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const authHeader = req.header('Authorization');
    console.log('Auth header:', authHeader);
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No token or invalid token format in header');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
    
    const token = authHeader.split(' ')[1];
    console.log('Token:', token);
    
    if (!token) {
      console.log('Empty token');
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    console.log('Verifying token with secret:', process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number, role: string };
    console.log('Decoded token:', decoded);
    
    // Get user from token
    console.log('Looking for user with ID:', decoded.id);
    const user = await User.findByPk(decoded.id);
    console.log('Found user:', user ? user.id : 'Not found');

    if (!user) {
      console.log(`User with ID ${decoded.id} not found in database`);
      return res.status(401).json({ 
        message: 'User not found for token',
        userId: decoded.id 
      });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ 
        message: 'Invalid token',
        error: err.message 
      });
    }
    res.status(500).json({ 
      message: 'Server error during authentication',
      error: (err as Error).message 
    });
  }
};
