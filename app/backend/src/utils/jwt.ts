// app/backend/src/utils/jwt.ts

import * as jwt from 'jsonwebtoken';

type PayloadToken = {
  id: number,
  email: string,
};

export default class Jwt {
  private secret = process.env.JWT_SECRET || 'TOP-SECRET';

  public verify(token: string): PayloadToken {
    const data = jwt.verify(token, this.secret) as PayloadToken;
    return data;
  }

  public sign(payload: PayloadToken): string {
    const token = jwt.sign(payload, this.secret, { algorithm: 'HS256' });
    return token;
  }
}
