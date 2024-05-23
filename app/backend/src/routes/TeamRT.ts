// app/backend/src/routes/TeamRT.ts

import { NextFunction, Request, Response, Router } from 'express';
import TeamCT from '../controllers/TeamCT';

const router = Router();
const teamController = new TeamCT();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  teamController.getAllTeams(req, res, next);
});
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  teamController.getTeamById(req, res, next);
});

export default router;
