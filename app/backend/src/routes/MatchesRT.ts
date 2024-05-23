// app/backend/src/routes/MatchesRT.ts

import { Router } from 'express';
import { iToken } from '../Interfaces';
import MatchesCT from '../controllers/MatchesCT';
import TokenMW from '../middlewares/tokenMW';

const router = Router();

const controller = new MatchesCT();
const tokenMidd = new TokenMW();

router.get('/', (req, res, next) => {
  controller.Matches(req, res, next);
});

router.patch(
  '/:id/finish',
  (req, res, next) => { tokenMidd.validToken(req as unknown as iToken, res, next); },
  (req, res, next) => {
    controller.Finish(req, res, next);
  },
);

router.patch(
  '/:id',
  (req, res, next) => { tokenMidd.validToken(req as unknown as iToken, res, next); },
  (req, res, next) => {
    controller.Goal(req, res, next);
  },
);

router.post(
  '/',
  (req, res, next) => { tokenMidd.validToken(req as unknown as iToken, res, next); },
  (req, res, next) => {
    controller.addMatch(req, res, next);
  },
);

export default router;
