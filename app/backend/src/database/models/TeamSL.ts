// app/backend/src/database/models/TeamSL.ts

import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

import db from '.';

export default class TeamSL
  extends Model<InferAttributes<TeamSL>, InferCreationAttributes<TeamSL>
  > {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

TeamSL.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING, allowNull: false,
  },
}, {
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});
