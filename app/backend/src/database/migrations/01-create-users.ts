// app/backend/src/database/migrations/01-create-users.ts

import { DataTypes, Model, QueryInterface } from "sequelize"
import { iUser } from "../../Interfaces";


export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<iUser>>('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      }
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  },
}