// app/backend/src/Interfaces/iServices.ts

export type iServiceMessage = { message: string };
export type iServiceResponse<Success, Error> = {
  status: number,
  data: Success | Error
};
