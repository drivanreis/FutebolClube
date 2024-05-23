// app/backend/src/services/MatchesSR.ts

import TeamML from '../database/models/TeamML';
import { iMatche, iMatcheAssociate, iServiceMessage, iServiceResponse } from '../Interfaces';
import db from '../database/models';
import MatchesML from '../database/models/MatchesML';

const badMessage = { message: 'Something went wrong' };

const matchesFilterOptions = (progress: boolean) => ({
  where: { inProgress: progress },
});

export default class MatcheSR {
  constructor(
    private _MatcheModel: MatchesML = new MatchesML(),
    private _TeamsModel = new TeamML(),
  ) {}

  public async getAllMatches()
  : Promise<iServiceResponse<iMatche[], iServiceMessage>> {
    const T = await db.transaction();
    try {
      const dbData = await this._MatcheModel.allMatches({});
      T.commit();
      return { status: 200, data: dbData as iMatcheAssociate[] };
    } catch {
      T.rollback();
      return { status: 500, data: badMessage };
    }
  }

  public async getMatchesWithFilter(progress = false)
    : Promise<iServiceResponse<iMatche[], iServiceMessage>> {
    const T = await db.transaction();
    try {
      const dbData = await this._MatcheModel.allMatches(matchesFilterOptions(progress));
      T.commit();
      return { status: 200, data: dbData as iMatcheAssociate[] };
    } catch {
      T.rollback();
      return { status: 500, data: badMessage };
    }
  }

  public async setFinish(id: number)
    : Promise<iServiceResponse<{ message: string }, iServiceMessage>> {
    const T = await db.transaction();
    try {
      await this._MatcheModel.finish(id);
      T.commit();
      return { status: 200, data: { message: 'Finished' } };
    } catch {
      T.rollback();
      return { status: 500, data: badMessage };
    }
  }

  public async goal(data: { id: number, awayTeamGoals: number, homeTeamGoals: number })
    : Promise<iServiceResponse<{ message: string }, iServiceMessage>> {
    const T = await db.transaction();
    try {
      const { id, awayTeamGoals, homeTeamGoals } = data;
      await this._MatcheModel.goal({ awayTeamGoals, homeTeamGoals, id });
      T.commit();
      return { status: 200, data: { message: 'Placar atualizado' } };
    } catch {
      T.rollback();
      return { status: 500, data: badMessage };
    }
  }

  private async teamsExist(awayTeamId: number, homeTeamId: number) {
    if (awayTeamId === homeTeamId) {
      return { status: 422,
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const homeTeamExists = await this._TeamsModel.findById(awayTeamId);
    const awayTeamExists = await this._TeamsModel.findById(homeTeamId);
    if (!homeTeamExists || !awayTeamExists) {
      return { status: 404,
        data: { message: 'There is no team with such id!' } };
    }
    return false;
  }

  public async newMatch(data: { awayTeamGoals: number,
    awayTeamId: number, homeTeamGoals: number, homeTeamId: number, }) {
    const T = await db.transaction();
    try {
      const { awayTeamGoals, awayTeamId, homeTeamGoals, homeTeamId } = data;
      const validTeams = await this.teamsExist(homeTeamId, awayTeamId);

      if (validTeams) {
        return { status: validTeams.status, data: validTeams.data };
      }
      const dbData = await this._MatcheModel
        .newMatche({ awayTeamGoals, homeTeamGoals, awayTeamId, homeTeamId });

      T.commit();
      return { status: 201, data: dbData };
    } catch {
      T.rollback(); return { status: 500, data: badMessage };
    }
  }
}
