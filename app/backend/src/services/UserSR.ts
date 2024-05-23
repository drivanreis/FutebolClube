// app/backend/src/services/UserSR.ts

import * as bcrypt from 'bcryptjs';
import UserML from '../database/models/UserML';
import { iServiceMessage, iServiceResponse } from '../Interfaces';
import Jwt from '../utils/jwt';

const msg = 'Invalid email or password';

export default class UserSR {
  private userModel = new UserML();

  static validEmail(email: string): boolean {
    // true para valido - false para invalido
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  public async login(email: string, password: string):
  Promise<iServiceResponse<{ token: string }, iServiceMessage>> {
    if (!email || !password) {
      return { status: 400, data: { message: 'All fields must be filled' } };
    }

    if (!UserSR.validEmail(email) || password.length < 6) {
      return { status: 401, data: { message: msg } };
    }

    const dbData = await this.userModel.findByEmail(email);

    if (!dbData) {
      return { status: 401, data: { message: msg } };
    }

    const passwordIsCorrect = bcrypt.compareSync(password, dbData.password);

    if (!passwordIsCorrect) {
      return { status: 401, data: { message: msg } };
    }

    const token = new Jwt().sign({ email, id: dbData.id });
    return { status: 200, data: { token } };
  }
}
