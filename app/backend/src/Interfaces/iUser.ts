// app/backend/src/Interfaces/iUser.ts

import { iNewEntity } from './iTeam';

export default interface iUser {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string
}

export interface iUserModelT {
  create(data: iNewEntity<iUser>): Promise<iUser>;
  findByEmail(email: string): Promise<iUser | undefined>;
}
