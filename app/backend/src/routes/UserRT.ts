// app/backend/src/routes/UserRT.ts

import { NextFunction, Request, Response, Router } from 'express';
import UserCT from '../controllers/UserCT';
import TokenMW from '../middlewares/tokenMW';
import { iToken } from '../Interfaces';

const router = Router();

const tokenMiddleware = new TokenMW();
const userController = new UserCT();

router.post('/', (req: Request, res: Response) => {
  userController.login(req, res);
});

router.get(
  '/role',
  (req: Request, res: Response, next: NextFunction) => {
    tokenMiddleware.validToken(req as iToken, res, next);
  },
  (req: Request, res: Response) => {
    const { role } = req as iToken;
    res.status(200).json({ role });
  },
);

export default router;
