// src/database/models/Matches.ts
import { CreationOptional,
  DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import db from '.';
import TeamSL from './TeamSL';

export default class MatchesSL extends
  Model<InferAttributes<MatchesSL>, InferCreationAttributes<MatchesSL>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesSL.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    field: 'away_team_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
    field: 'home_team_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  timestamps: false,
  sequelize: db,
  underscored: true,
  tableName: 'matches',
});

TeamSL.hasMany(MatchesSL, { foreignKey: 'awayTeamId', as: 'awayTeam' });
TeamSL.hasMany(MatchesSL, { foreignKey: 'homeTeamId', as: 'homeTeam' });

MatchesSL.belongsTo(TeamSL, { foreignKey: 'awayTeamId', as: 'awayTeam' });
MatchesSL.belongsTo(TeamSL, { foreignKey: 'homeTeamId', as: 'homeTeam' });
