// src/controllers/LeaderBoardCT.ts
import { Request, Response } from 'express';
import LeaderboardML, { leaderBoardType } from '../database/models/LeaderboardML';

export default class LeaderboardCT {
  private matcheService = new LeaderboardML();

  static saldoDeGoalsSort(a: leaderBoardType, b: leaderBoardType) {
    if ((a.totalPoints === b.totalPoints && (a.totalVictories === b.totalVictories))
    && (a.totalVictories > b.totalVictories)) {
      // -1
      return true;
    }
    return false;
  }

  static sortedBoard(board: leaderBoardType[]): leaderBoardType[] {
    const sortedBoard = board.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (LeaderboardCT.saldoDeGoalsSort(a, b)) return -1;
      if ((a.totalPoints === b.totalPoints && (a.totalVictories === b.totalVictories))
      && (a.goalsBalance > b.goalsBalance)) {
        return -1;
      }
      if ((a.totalPoints === b.totalPoints && (a.totalVictories === b.totalVictories)
      && (a.goalsBalance === b.goalsBalance)) && (a.goalsFavor > b.goalsFavor)) {
        return -1;
      }
      return 1;
    });
    return sortedBoard;
  }

  public async getLeaderBoardHome(_req: Request, res: Response) {
    try {
      const board = await this.matcheService.leaderboardHome();
      return res.status(200).json(LeaderboardCT.sortedBoard(board));
    } catch (error) {
      console.log(error);
    }
  }

  public async getLeaderBoardAway(_req: Request, res: Response) {
    try {
      const board = await this.matcheService.leaderboardAway();
      return res.status(200).json(LeaderboardCT.sortedBoard(board));
    } catch (error) {
      console.log(error);
    }
  }
}
