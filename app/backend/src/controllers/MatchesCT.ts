// src/controllers/MatchesCT.ts
import { NextFunction, Request, Response } from 'express';
import MatcheSR from '../services/MatchesSR';

export default class MatchesCT {
  private matcheService = new MatcheSR();

  public async Matches(req: Request, res: Response, next: NextFunction) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const serviceResponse = await this.matcheService.getAllMatches();
      return res.status(serviceResponse.status).json(serviceResponse.data);
    }
    const serviceResponse = await this.matcheService.getMatchesWithFilter(inProgress === 'true');
    if (serviceResponse.status === 500) {
      return next(new Error());
    }
    res.status(serviceResponse.status).json(serviceResponse.data);
  }

  public async Finish(req: Request, res:Response, next: NextFunction) {
    const { id } = req.params;
    const serviceResponse = await this.matcheService.setFinish(Number(id));
    if (serviceResponse.status === 500) {
      return next(new Error());
    }
    res.status(serviceResponse.status).json(serviceResponse.data);
  }

  public async Goal(req: Request, res:Response, next: NextFunction) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const serviceResponse = await this.matcheService
      .goal({ awayTeamGoals, homeTeamGoals, id: Number(id) });
    if (serviceResponse.status === 500) {
      return next(new Error());
    }
    res.status(serviceResponse.status).json(serviceResponse.data);
  }

  public async addMatch(req: Request, res:Response, next: NextFunction) {
    const { awayTeamGoals, awayTeamId, homeTeamGoals, homeTeamId } = req.body;
    const serviceResponse = await this.matcheService
      .newMatch({ awayTeamGoals, awayTeamId, homeTeamGoals, homeTeamId });
    if (serviceResponse.status === 500) {
      return next(new Error());
    }
    res.status(serviceResponse.status).json(serviceResponse.data);
  }
}
