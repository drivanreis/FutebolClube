// app/backend/src/database/models/TeamML.ts

import { iTeam, iTeamModelT } from '../../Interfaces';
import TeamSL from './TeamSL';

export default class TeamML implements iTeamModelT {
  private model = TeamSL;
  async findAll(): Promise<iTeam[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  async findById(id:number): Promise<iTeam | undefined> {
    const dbData = await this.model.findOne({ where: { id } });
    const team = dbData?.toJSON();
    return team;
  }
}
