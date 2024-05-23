// app/backend/src/tests/mocks/UserMK.ts

import { iUser } from "../../Interfaces"
import * as bcrypt from 'bcryptjs'

export default class UserMK {
  public validFields = {
    email: "teste@teste.com",
    password: "greatPassword"
  }

  public undefinedFields = {
    enail: 'enailkkkkkkkk',
    palword: 'fakePokemon'
  }

  public invalidFields = {
    email: "flamengo@cheiro",
    password: "ecati"
  }

  public validFindByEmailMocked: iUser = {
    ...this.validFields,
    password: bcrypt.hashSync('greatPassword', 12),
    id: 1,
    role: 'admin',
    username: 'ademir'
  }

  public invalidFindByEmailMocked: iUser = {
    id: 2,
    email: 'teste@teste.com',
    password: bcrypt.hashSync('blablabla', 5),
    role: 'admin',
    username: 'ademir'
  }

  public token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQHRlc3RlLmNvbSIsImlkIjoxLCJpYXQiOjE3MTE1Njg0ODB9.38sml378zh1RUw-l79JWK42FxRe3HBVL8kGuFxPH-QI'
}