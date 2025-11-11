import { Router } from 'express';
import authRouter from './auth';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'API v1' });
});

router.use('/auth', authRouter);

export default router;
