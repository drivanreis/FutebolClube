// app/backend/src/Interfaces/iToken.ts

import { Request } from 'express';

export default interface iToken extends Request{
  role: string
}
