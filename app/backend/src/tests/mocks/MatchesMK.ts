// app/backend/src/tests/mocks/MatchesMK.ts

import { iMatche, iTeam } from "../../Interfaces"

export default class MatchesMock {
  public falseProgress = [
    {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 1,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "id": 16,
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "id": 8,
        "teamName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeamId": 9,
      "homeTeamGoals": 1,
      "awayTeamId": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "id": 9,
        "teamName": "Internacional"
      },
      "awayTeam": {
        "id": 14,
        "teamName": "Santos"
      }
    }
  ]
  public trueProgress = [
    {
      "id": 41,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeTeam": {
        "id": 16,
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "id": 9,
        "teamName": "Internacional"
      }
    },
    {
      "id": 42,
      "homeTeamId": 6,
      "homeTeamGoals": 1,
      "awayTeamId": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeTeam": {
        "id": 6,
        "teamName": "Ferroviária"
      },
      "awayTeam": {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      }
    }
  ]

  public noFilterMatches = [
    {
      "id": 42,
      "homeTeamId": 6,
      "homeTeamGoals": 1,
      "awayTeamId": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeTeam": {
        "id": 6,
        "teamName": "Ferroviária"
      },
      "awayTeam": {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      }
    },
    {
      "id": 2,
      "homeTeamId": 9,
      "homeTeamGoals": 1,
      "awayTeamId": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "id": 9,
        "teamName": "Internacional"
      },
      "awayTeam": {
        "id": 14,
        "teamName": "Santos"
      }
    }
  ]

  public mockValidTeams: iTeam[] = [
    {
      id: 1, teamName: 'vasco'
    },
    {
      id: 2, teamName: 'flamengo'
    }
  ]

  public equalTeams = {
    awayTeamId: 1,
    homeTeamId: 1
  }

  public bodyNewTeam: Partial<iMatche> = {
    awayTeamGoals: 0,
    awayTeamId: 1,
    homeTeamGoals: 0,
    homeTeamId: 2
  }

  public newTeamData: iMatche = {
    id: 3,
    awayTeamGoals: 0,
    homeTeamGoals: 0,
    awayTeamId: 1,
    homeTeamId: 2,
    inProgress: true
  }
}