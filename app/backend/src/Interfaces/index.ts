// app/backend/src/Interfaces/index.ts

import iTeam, { iTeamModelT, iNewEntity } from './iTeam';
import iMatche, { iMatchesT, iMatcheAssociate } from './iMatche';
import iUser, { iUserModelT } from './iUser';
import iToken from './iToken';
import { iServiceMessage, iServiceResponse }
  from './iServices';

export { iToken };
export { iUser, iUserModelT };
export { iMatche, iMatchesT, iMatcheAssociate };
export { iTeam, iTeamModelT, iNewEntity };
export { iServiceMessage, iServiceResponse };
