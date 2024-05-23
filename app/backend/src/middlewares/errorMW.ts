// app/backend/src/middlewares/errorMW.ts

import { Request, Response, NextFunction } from 'express';
import ICustomError from '../Interfaces/ICustomError';

function errorMW(_error: ICustomError, _req: Request, res: Response, _next: NextFunction) {
  return res.status(500).json({ message: 'Something went wrong' });
}

export default errorMW;
