// app/backend/src/services/TeamsSR.ts

import TeamML from '../database/models/TeamML';
import { iServiceMessage, iServiceResponse, iTeam } from '../Interfaces';
import db from '../database/models';

const ErrorMessage = { message: 'Algum erro inesperado aconteceu' };

export default class TeamSR {
  constructor(private _TeamModel: TeamML = new TeamML()) {}
  public async findAllTeams(): Promise<iServiceResponse<iTeam[], iServiceMessage>> {
    const T = await db.transaction();
    try {
      const dbData = await this._TeamModel.findAll();
      T.commit();
      return { status: 200, data: dbData };
    } catch (error) {
      T.rollback();
      return { status: 500, data: ErrorMessage };
    }
  }

  public async findByTeamId(id:number): Promise<iServiceResponse<iTeam, iServiceMessage>> {
    const T = await db.transaction();
    try {
      const dbData = await this._TeamModel.findById(id);
      if (!dbData) {
        return { status: 404, data: { message: 'Time não encontrado' } };
      }
      T.commit();
      return { status: 200, data: dbData };
    } catch (error) {
      return { status: 500, data: ErrorMessage };
    }
  }
}
