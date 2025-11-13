import { Router } from 'express';
import authRouter from './auth';
import userRouter from './user';

const router = Router();

router.get('/', (_req, res) => {
  res.json({ message: 'API v1' });
});

router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;
