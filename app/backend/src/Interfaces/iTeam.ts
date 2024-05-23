// app/backend/src/Interfaces/iTeam.ts

export type iNewEntity<T> = Omit<T, 'id'>;

export default interface iTeam {
  id: number,
  teamName: string
}

export interface iTeamModelT {
  findAll(): Promise<iTeam[]>
  findById(id: number): Promise<iTeam | undefined>
}
