// app/backend/src/Interfaces/iMatche.ts

import { FindOptions, InferAttributes } from 'sequelize';
import MatchesSL from '../database/models/MatchesSL';

export default interface iMatche {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface iMatcheAssociate extends iMatche{
  homeTeam: { teamName: string },
  awayTeam: { teamName: string },
}

export interface iMatchesT {
  allMatches(options
  : FindOptions<InferAttributes<MatchesSL, { omit: never; }>>): Promise<iMatche[]>
  finish(id: number): Promise<{ message: 'Finished' }>
  goal(data: { id: number, homeTeamGoals: number, awayTeamGoals: number }): Promise<void>
  newMatche(data: Omit<Omit<iMatche, 'inProgress'>, 'id'>): Promise<iMatche>;
}
