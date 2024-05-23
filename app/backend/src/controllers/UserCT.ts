// src/controllers/UserCT.ts
import { Request, Response } from 'express';
import UserSR from '../services/UserSR';

export default class UserCT {
  private teamService = new UserSR();

  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const serviceResponse = await this.teamService.login(email, password);
    res.status(serviceResponse.status).json(serviceResponse.data);
  }
}
