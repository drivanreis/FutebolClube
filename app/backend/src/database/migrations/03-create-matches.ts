// app/backend/src/database/migrations/09-create-matches.ts

import { DataTypes, Model, QueryInterface } from "sequelize"
import iMatches from '../../Interfaces/iMatche';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<iMatches>>('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      homeTeamId: {
        allowNull: false,
        field: 'home_team_id',
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'teams',
          key: 'id',
        },
      },
      homeTeamGoals: {
        allowNull: false,
        field: 'home_team_goals',
        type: DataTypes.INTEGER,
      },
      awayTeamId: {
        allowNull: false,
        field: 'away_team_id',
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'teams',
          key: 'id',
        },
      },
      awayTeamGoals: {
        allowNull: false,
        field: 'away_team_goals',
        type: DataTypes.INTEGER,
      },
      inProgress: {
        allowNull: false,
        field: 'in_progress',
        type: DataTypes.BOOLEAN,
      },
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
}
