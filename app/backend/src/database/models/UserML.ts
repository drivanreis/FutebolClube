// app/backend/src/database/models/UserML.ts

import { iNewEntity, iUser, iUserModelT } from '../../Interfaces';
import UserSL from './UserSL';

export default class UserML implements iUserModelT {
  private model = UserSL;

  public async create(data: iNewEntity<iUser>): Promise<iUser> {
    const dbData = await this.model.create(data);
    const user = dbData.toJSON();
    return user;
  }

  public async findByEmail(email: string): Promise<iUser | undefined> {
    const dbData = await this.model.findOne({ where: { email } });
    const user = dbData?.toJSON();
    return user;
  }
}
