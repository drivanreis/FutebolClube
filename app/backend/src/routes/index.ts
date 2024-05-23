// app/backend/src/routes/index.ts

import { Router } from 'express';
import teamRouter from './TeamRT';
import userRouter from './UserRT';
import matchesRouter from './MatchesRT';
import leaderboardRouter from './LeaderboardRT';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
