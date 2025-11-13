import { Router } from 'express';
import { getCurrentUser } from '../controllers/userController';
import { auth, AuthRequest } from '../middleware/auth';
import { Response, NextFunction, RequestHandler } from 'express';

const router = Router();

// Protected route - requires authentication
router.get('/me', auth, (async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await getCurrentUser(req, res);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

export default router;
