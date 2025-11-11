import { Router } from 'express';
import { login } from '../controllers/authController';

const router = Router();

/**
 * POST /api/auth/login
 * body: { email, password }
 */
router.post('/login', login);

export default router;
