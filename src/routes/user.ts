import { Router, Response, NextFunction, RequestHandler } from 'express';
import { getCurrentUser } from '../controllers/userController';
import { auth, AuthRequest } from '../middleware/auth';

const router = Router();

// Define a custom type that extends RequestHandler with our AuthRequest
type AuthRequestHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => Promise<void>;

// Protected route - requires authentication
const getCurrentUserHandler: AuthRequestHandler = async (req, res, next) => {
  try {
    await getCurrentUser(req, res);
  } catch (error) {
    next(error);
  }
};

// Apply the auth middleware and our typed handler
router.get('/me', auth, getCurrentUserHandler as unknown as RequestHandler);

export default router;
