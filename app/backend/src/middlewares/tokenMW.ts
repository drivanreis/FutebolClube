// app/backend/src/Middlewares/TokenMW.ts

import { NextFunction, Response } from 'express';
import { iToken } from '../Interfaces';
import UserML from '../database/models/UserML';
import Jwt from '../utils/jwt';

export default class TokenMW {
  // criar a instacia UserML
  private userModel = new UserML();

  public async validToken(req: iToken, res: Response, next: NextFunction): Promise<void> {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({ message: 'Token not found' });
    } else {
      try {
        const token = authorization.split(' ')[1];
        const { email } = new Jwt().verify(token);
        const dbData = await this.userModel.findByEmail(email);

        if (!dbData) {
          res.status(401).json({ message: 'Token must be a valid token' });
        } else {
          req.role = dbData.role;
          next();
        }
      } catch {
        res.status(401).json({ message: 'Token must be a valid token' });
      }
    }
  }
}
