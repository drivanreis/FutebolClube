// app/backend/src/tests/TeamGet.test.ts

import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamSL from '../database/models/TeamSL';
import TeamMK from './mocks/TeamMK';
const mocks = new TeamMK();

chai.use(chaiHttp);

const { expect } = chai;

describe('Team - GET', () => {
  beforeEach(() => sinon.restore())
  it('Espera que retorne uma lista de times', async () => {
    sinon.stub(TeamSL, 'findAll').resolves(mocks.findAll() as any);

    const httpRequest = await chai.request(app).get('/teams');

    expect(httpRequest.status).to.eq(200);
    expect(httpRequest.body).to.deep.eq(mocks.findAll());
  });

  it('Espera que retorne O PODEROSO VASCO DA GAMA', async () => {
    const mockResolve = TeamSL.build(mocks.findOne() as any);
    sinon.stub(TeamSL, 'findOne').resolves(mockResolve);

    const httpRequest = await chai.request(app).get('/teams/777');

    expect(httpRequest.status).to.eq(200);
    expect(httpRequest.body).to.deep.eq(mocks.findOne());
  });

  it('Espera que retorne um 404 caso o time não seja encontrado', async () => {
    sinon.stub(TeamSL, 'findOne').resolves(undefined);

    const httpRequest = await chai.request(app).get('/teams/1234123123123');

    expect(httpRequest.status).to.eq(404);
    expect(httpRequest.body).to.deep.eq({ message: 'Time não encontrado' });
  });

  it('Espera que retorne um status 500 com uma mensagem de erro caso seja lançado um erro durante a transação', async () => {
    sinon.stub(TeamSL, 'findAll').rejects(new Error('Test error'));

    const httpRequest = await chai.request(app).get('/teams');

    expect(httpRequest.status).to.eq(500);
    expect(httpRequest.body).to.deep.eq({ message: 'Something went wrong' });
  });

  it('Espera que retorne um status 500 com uma mensagem de erro caso seja lançado um erro durante a transação', async () => {
    sinon.stub(TeamSL, 'findOne').rejects(new Error('Test error'));

    const httpRequest = await chai.request(app).get('/teams/1');

    expect(httpRequest.status).to.eq(500);
    expect(httpRequest.body).to.deep.eq({ message: 'Something went wrong' });
  })
});
