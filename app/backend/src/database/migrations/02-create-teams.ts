// app/backend/src/database/migrations/02-create-teams.ts

import { DataTypes, Model, QueryInterface } from "sequelize"

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<{id: number, team_name:string}>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      team_name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  },
}