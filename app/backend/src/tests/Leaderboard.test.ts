// app/backend/src/tests/Leaderboard.test.ts

import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamMK from './mocks/TeamMK';

chai.use(chaiHttp);

const { expect } = chai;

describe('LeaderBoard - GET', () => {
  beforeEach(() => sinon.restore())
  it('Retorne um array com o resultado dos jogos em casa', async () => {
    const req = await chai.request(app).get('/leaderboard/home');
    // Verifica se a resposta possui o status 200 (OK)
    expect(req).to.have.status(200);
    
    // Verifica se o corpo da resposta é um array
    expect(req.body).to.be.an('array');

    console.log(req.body)
  })

  it('Retorne um array com o resultado dos jogos fora de casa', async () => {
    const req = await chai.request(app).get('/leaderboard/away');
    // Verifica se a resposta possui o status 200 (OK)
    expect(req).to.have.status(200);
    
    // Verifica se o corpo da resposta é um array
    expect(req.body).to.be.an('array');

    console.log(req.body.length)
  })
  it('', async () => { })
});
