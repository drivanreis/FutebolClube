// src/database/models/MatchesML.ts
import { FindOptions, InferAttributes } from 'sequelize';
import { iMatche, iMatchesT } from '../../Interfaces';
import MatchesSL from './MatchesSL';
import TeamSL from './TeamSL';

export default class MatchesML implements iMatchesT {
  private model = MatchesSL;

  public async allMatches(options?
  : FindOptions<InferAttributes<MatchesSL, { omit: never; }>>): Promise<iMatche[]> {
    const dbData = await this.model.findAll({ ...options,
      include: [{ model: TeamSL, as: 'awayTeam' },
        { model: TeamSL, as: 'homeTeam' }] });
    return dbData;
  }

  async finish(id: number): Promise<{ message: 'Finished'; }> {
    await this.model.update({
      inProgress: false,
    }, { where: { id } });
    return { message: 'Finished' };
  }

  async goal(data: { id: number, homeTeamGoals: number, awayTeamGoals: number }): Promise<void> {
    const { homeTeamGoals, id, awayTeamGoals } = data;
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async newMatche(data: Omit<Omit<iMatche, 'inProgress'>, 'id'>): Promise<iMatche> {
    const { awayTeamGoals, awayTeamId, homeTeamGoals, homeTeamId } = data;
    const dbData = await this.model.create({
      awayTeamGoals, awayTeamId, homeTeamGoals, homeTeamId, inProgress: true,
    });
    return dbData;
  }

  public async idExists(id:number):Promise<boolean> {
    const verifyInDb = await this.model.findOne({ where: { id } });

    if (!verifyInDb) {
      return false;
    }
    return true;
  }
}
