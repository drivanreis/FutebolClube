// src/database/models/LeaderboardML.ts
import { iMatcheAssociate } from '../../Interfaces';
import MatchesML from './MatchesML';

export type leaderBoardType = {
  name: string,
  goalsFavor: number,
  goalsOwn: number,
  totalGames: number,
  totalDraws: number,
  totalLosses: number,
  totalPoints: number,
  totalVictories: number,
  goalsBalance: number,
  efficiency: number,
};

export default class LeaderboardML extends MatchesML {
  static draw(away: number, home: number) {
    if (away === home) return 1;
    return 0;
  }

  static lose(away: number, home: number) {
    if (away > home) return 1;
    return 0;
  }

  static win(away: number, home: number) {
    if (away < home) return 1;
    return 0;
  }

  static points(away: number, home: number) {
    const win = LeaderboardML.win(away, home);
    const draw = LeaderboardML.draw(away, home);
    if (win) return 3;
    if (draw) return 1;
    return 0;
  }

  static aproveitamento(totalPoints: number, totalMatches: number): number {
    return Number(((totalPoints / (totalMatches * 3)) * 100).toFixed(2));
  }

  static saldoDeGols(gp: number, gc: number) {
    return (gp - gc);
  }

  static newTeamBoardAway(team: iMatcheAssociate): leaderBoardType {
    return {
      name: team.awayTeam.teamName,
      goalsFavor: team.awayTeamGoals,
      goalsOwn: team.homeTeamGoals,
      totalGames: 1,
      totalDraws: LeaderboardML.draw(team.homeTeamGoals, team.awayTeamGoals),
      totalLosses: LeaderboardML.lose(team.homeTeamGoals, team.awayTeamGoals),
      totalPoints: LeaderboardML.points(team.homeTeamGoals, team.awayTeamGoals),
      totalVictories: LeaderboardML.win(team.homeTeamGoals, team.awayTeamGoals),
      goalsBalance: team.awayTeamGoals - team.homeTeamGoals,
      efficiency: LeaderboardML.aproveitamento(LeaderboardML
        .points(team.homeTeamGoals, team.awayTeamGoals), 1),
    };
  }

  public async leaderboardAway() {
    const matches = await this.allMatches({ where: { inProgress: false } }) as iMatcheAssociate[];
    const finishedBoard: leaderBoardType[] = [];
    matches.forEach((team) => {
      const actualTeam = finishedBoard.findIndex((e) => e.name === team.awayTeam.teamName);
      if (actualTeam !== -1) {
        const editTeam = finishedBoard[actualTeam];
        editTeam.goalsFavor += team.awayTeamGoals;
        editTeam.goalsOwn += team.homeTeamGoals;
        editTeam.totalGames += 1;
        editTeam.totalDraws += LeaderboardML.draw(team.homeTeamGoals, team.awayTeamGoals);
        editTeam.totalLosses += LeaderboardML.lose(team.homeTeamGoals, team.awayTeamGoals);
        editTeam.totalPoints += LeaderboardML.points(team.homeTeamGoals, team.awayTeamGoals);
        editTeam.totalVictories += LeaderboardML.win(team.homeTeamGoals, team.awayTeamGoals);
        editTeam.efficiency = LeaderboardML
          .aproveitamento(editTeam.totalPoints, editTeam.totalGames);
        editTeam.goalsBalance = editTeam.goalsFavor - editTeam.goalsOwn;
      } else { finishedBoard.push(LeaderboardML.newTeamBoardAway(team)); }
    }, []); return finishedBoard;
  }

  static newTeamBoardHome(team: iMatcheAssociate): leaderBoardType {
    return {
      name: team.homeTeam.teamName,
      goalsFavor: team.homeTeamGoals,
      goalsOwn: team.awayTeamGoals,
      totalGames: 1,
      totalDraws: LeaderboardML.draw(team.awayTeamGoals, team.homeTeamGoals),
      totalLosses: LeaderboardML.lose(team.awayTeamGoals, team.homeTeamGoals),
      totalPoints: LeaderboardML.points(team.awayTeamGoals, team.homeTeamGoals),
      totalVictories: LeaderboardML.win(team.awayTeamGoals, team.homeTeamGoals),
      goalsBalance: team.homeTeamGoals - team.awayTeamGoals,
      efficiency: LeaderboardML.aproveitamento(LeaderboardML
        .points(team.awayTeamGoals, team.homeTeamGoals), 1),
    };
  }

  public async leaderboardHome() {
    const matches = await this.allMatches({ where: { inProgress: false } }) as iMatcheAssociate[];
    const finishedBoard: leaderBoardType[] = [];
    matches.forEach((team) => {
      const actualTeam = finishedBoard.findIndex((e) => e.name === team.homeTeam.teamName);
      if (actualTeam !== -1) {
        const editTeam = finishedBoard[actualTeam];
        editTeam.goalsFavor += team.homeTeamGoals;
        editTeam.goalsOwn += team.awayTeamGoals;
        editTeam.totalGames += 1;
        editTeam.totalDraws += LeaderboardML.draw(team.awayTeamGoals, team.homeTeamGoals);
        editTeam.totalLosses += LeaderboardML.lose(team.awayTeamGoals, team.homeTeamGoals);
        editTeam.totalPoints += LeaderboardML.points(team.awayTeamGoals, team.homeTeamGoals);
        editTeam.totalVictories += LeaderboardML.win(team.awayTeamGoals, team.homeTeamGoals);
        editTeam.efficiency = LeaderboardML
          .aproveitamento(editTeam.totalPoints, editTeam.totalGames);
        editTeam.goalsBalance = editTeam.goalsFavor - editTeam.goalsOwn;
      } else { finishedBoard.push(LeaderboardML.newTeamBoardHome(team)); }
    }, []); return finishedBoard;
  }
}
