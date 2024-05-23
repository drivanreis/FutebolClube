// src/controllers/UserCT.ts
import { NextFunction, Request, Response } from 'express';
import TeamSR from '../services/TeamsSR';

export default class TeamCT {
  constructor(private _teamService = new TeamSR()) {}
  public async getAllTeams(_req: Request, res: Response, next:NextFunction): Promise<void> {
    const serviceResponse = await this._teamService.findAllTeams();
    if (serviceResponse.status === 500) {
      return next(new Error('Something went wrong'));
    }
    res.status(serviceResponse.status).json(serviceResponse.data);
  }

  public async getTeamById(req: Request, res: Response, next:NextFunction): Promise<void> {
    const { id } = req.params;
    const serviceResponse = await this._teamService.findByTeamId(Number(id));
    if (serviceResponse.status === 500) {
      return next(new Error('Something went wrong'));
    }
    res.status(serviceResponse.status).json(serviceResponse.data);
  }
}
