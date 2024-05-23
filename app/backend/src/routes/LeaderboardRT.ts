// app/backend/src/routes/LeaderboardRT.ts

import { Router } from 'express';
import LeaderboardCT from '../controllers/LeaderBoardCT';

const router = Router();

const controller = new LeaderboardCT();

router.get('/home', (req, res) => {
  controller.getLeaderBoardHome(req, res);
});
router.get(
  '/away',
  (req, res) => {
    controller.getLeaderBoardAway(req, res);
  },
);

export default router;
