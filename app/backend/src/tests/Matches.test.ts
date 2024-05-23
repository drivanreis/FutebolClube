// app/backend/src/tests/Matches.test.ts

import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore]
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserSL from '../database/models/UserSL';
import UserMK from './mocks/UserMK';
import MatchesSL from '../database/models/MatchesSL';
import MatchesMK from './mocks/MatchesMK';
import TeamSL from '../database/models/TeamSL';
const mock = new UserMK();
const MatchMock = new MatchesMK();

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches', () => {
  beforeEach(() => sinon.restore())
  it('Espera um array com todas as partidas não acabadas', async () => {
    const mockResolvedMatches = MatchesSL
      .build(MatchMock.falseProgress as any, {
        include: [{
          model: TeamSL,
          as: 'awayTeam',
        }, {
          model: TeamSL,
          as: 'homeTeam',
        }]
      })

    sinon.stub(MatchesSL, 'findAll')
      .resolves(mockResolvedMatches as any);


    const httpRequest = await chai.request(app)
      .get('/matches?inProgress=false')

    expect(httpRequest.status).to.eq(200)
    expect(httpRequest.body).to.deep.eq(MatchMock.falseProgress)
  });

  it('Espera um array com todas partidas finalizadas', async () => {
    const mockResolvedMatches = MatchesSL
      .build(MatchMock.trueProgress as any, {
        include: [{
          model: TeamSL,
          as: 'awayTeam',
        }, {
          model: TeamSL,
          as: 'homeTeam',
        }]
      })

    sinon.stub(MatchesSL, 'findAll')
      .resolves(mockResolvedMatches as any);


    const httpRequest = await chai.request(app)
      .get('/matches?inProgress=true')

    expect(httpRequest.status).to.eq(200);
    expect(httpRequest.body).to.deep.eq(MatchMock.trueProgress)
  })

  it('Retorne uma mensagem de erro! Caso aconteça algum problema durante a transaction com filtro', async () => {
    sinon.stub(MatchesSL, 'findAll')
      .rejects(new Error())

    const httpRequest = await chai.request(app)
      .get('/matches?inProgress=true')

    expect(httpRequest.status).to.eq(500);
    expect(httpRequest.body).to.deep.eq({ message: "Something went wrong" })
  })

  it('Retorne uma lista de partidas. Sem nenhum filtro', async () => {
    const mockResolvedMatches = MatchesSL
      .build(MatchMock.noFilterMatches as any, {
        include: [{
          model: TeamSL,
          as: 'awayTeam',
        }, {
          model: TeamSL,
          as: 'homeTeam',
        }]
      });

    sinon.stub(MatchesSL, 'findAll')
      .resolves(mockResolvedMatches as any)


    const httpRequest = await chai.request(app)
      .get('/matches')

    expect(httpRequest.status).to.eq(200);
    expect(httpRequest.body).to.deep.eq(MatchMock.noFilterMatches)
  })

  it('Espera que retorne uma mensagem caso aconteça um erro durante a transaction sem filtro', async () => {
    sinon.stub(MatchesSL, 'findAll').rejects(new Error());

    const httpRequest = await chai.request(app)
      .get('/matches')

    expect(httpRequest.status).to.eq(500)
    expect(httpRequest.body).to.deep.eq({ message: "Something went wrong" })
  })

  it('Espera que seja possivel setar uma partida como finalizada', async () => {
    const mockResolvedToken = UserSL.build(mock.validFindByEmailMocked);
    sinon.stub(UserSL, 'findOne')
      .resolves(mockResolvedToken)

    sinon.stub(MatchesSL, 'update');

    const { body } = await chai.request(app).post('/login').send(mock.validFields);

    const httpRequest = await chai.request(app)
      .patch('/matches/2/finish')
      .set({ authorization: 'Bearer: ' + body.token });

    expect(httpRequest.status).to.eq(200);
    expect(httpRequest.body).to.deep.eq({ message: "Finished" })

  });

  it('Espera que retorne uma mensagem caso a transaction retorne um erro', async () => {
    const mockResolvedToken = UserSL.build(mock.validFindByEmailMocked);
    sinon.stub(UserSL, 'findOne')
      .resolves(mockResolvedToken)

    sinon.stub(MatchesSL, 'update').rejects(new Error());

    const { body } = await chai.request(app).post('/login').send(mock.validFields);

    const httpRequest = await chai.request(app)
      .patch('/matches/2/finish')
      .set({ authorization: 'Bearer: ' + body.token });

    expect(httpRequest.status).to.eq(500);
    expect(httpRequest.body).to.deep.eq({ message: "Something went wrong" })

  });

  it('Espera que retorne a mensagem "Placar atualizado" ao passar um novo placar', async () => {
    const mockResolvedToken = UserSL.build(mock.validFindByEmailMocked);
    sinon.stub(UserSL, 'findOne')
      .resolves(mockResolvedToken)

    sinon.stub(MatchesSL, 'update');

    const { body } = await chai.request(app).post('/login').send(mock.validFields);

    const httpRequest = await chai.request(app)
      .patch('/matches/2')
      .send({ awayTeamGoals: 2, homeTeamGoals: 5 })
      .set({ authorization: 'Bearer: ' + body.token });

    expect(httpRequest.status).to.eq(200);
    expect(httpRequest.body).to.deep.eq({ message: "Placar atualizado" })
  })

  it('Espera que retorne um erro caso aconteça algo durante a transaction do placar', async () => {
    const mockResolvedToken = UserSL.build(mock.validFindByEmailMocked);
    sinon.stub(UserSL, 'findOne')
      .resolves(mockResolvedToken)

    sinon.stub(MatchesSL, 'update').rejects(new Error());

    const { body } = await chai.request(app).post('/login').send(mock.validFields);

    const httpRequest = await chai.request(app)
      .patch('/matches/2')
      .set({ authorization: 'Bearer: ' + body.token });

    expect(httpRequest.status).to.eq(500);
    expect(httpRequest.body).to.deep.eq({ message: "Something went wrong" })
  })

  // POST 

  it('Espera que retorne um ok caso seja passado uma partida com times validos', async () => {
    const mockResolvedToken = UserSL.build(mock.validFindByEmailMocked);
    const mockResolvedTeam1 = TeamSL.build(MatchMock.mockValidTeams[0]);
    const mockResolvedTeam2 = TeamSL.build(MatchMock.mockValidTeams[1]);
    const mockResolvedMatch = MatchesSL.build(MatchMock.newTeamData);
    sinon.stub(UserSL, 'findOne').resolves(mockResolvedToken)
    sinon.stub(MatchesSL, 'create').resolves(mockResolvedMatch);

    sinon.stub(TeamSL, 'findOne')
      .onFirstCall().resolves(mockResolvedTeam1)
      .onSecondCall().resolves(mockResolvedTeam2);


    const { body } = await chai.request(app).post('/login').send(mock.validFields);

    const httpRequest = await chai.request(app)
      .post('/matches')
      .send(MatchMock.bodyNewTeam)
      .set({ authorization: 'Bearer: ' + body.token });

    expect(httpRequest.status).to.eq(201);
    expect(httpRequest.body).to.deep.eq(MatchMock.newTeamData);
  })
  it('Espera que retorne um erro caso os ids sejam iguais', async () => {
    const mockResolvedToken = UserSL.build(mock.validFindByEmailMocked);
    sinon.stub(UserSL, 'findOne').resolves(mockResolvedToken)

    const { body } = await chai.request(app).post('/login').send(mock.validFields);

    const httpRequest = await chai.request(app)
      .post('/matches')
      .send(MatchMock.equalTeams)
      .set({ authorization: 'Bearer: ' + body.token });

    expect(httpRequest.status).to.eq(422);
    expect(httpRequest.body).to.deep.eq({ message: 'It is not possible to create a match with two equal teams' });
  });

  it('Espera que retorne um erro caso um dos ids não exista', async () => {
    const mockResolvedToken = UserSL.build(mock.validFindByEmailMocked);
    sinon.stub(UserSL, 'findOne').resolves(mockResolvedToken)

    const { body } = await chai.request(app).post('/login').send(mock.validFields);

    sinon.stub(TeamSL, 'findOne')
      .onFirstCall().resolves(null)
      .onSecondCall().resolves(null);


    const httpRequest = await chai.request(app)
      .post('/matches')
      .send({ homeTeamId: 1, awayTeamId: 2 })
      .set({ authorization: 'Bearer: ' + body.token });

    expect(httpRequest.status).to.eq(404);
    expect(httpRequest.body).to.deep.eq({ message: 'There is no team with such id!' });
  })
  it('Espera que retorne status 500 caso ocorra um erro durante a criação de uma partida', async () => {
    const mockResolvedToken = UserSL.build(mock.validFindByEmailMocked);
    sinon.stub(UserSL, 'findOne').resolves(mockResolvedToken)

    const mockResolvedTeam1 = TeamSL.build(MatchMock.mockValidTeams[0]);
    const mockResolvedTeam2 = TeamSL.build(MatchMock.mockValidTeams[1]);
    sinon.stub(TeamSL, 'findOne')
      .onFirstCall().resolves(mockResolvedTeam1)
      .onSecondCall().resolves(mockResolvedTeam2);

    sinon.stub(MatchesSL, 'create').rejects(new Error());

    const { body } = await chai.request(app).post('/login').send(mock.validFields);

    const httpRequest = await chai.request(app)
      .post('/matches')
      .send(MatchMock.bodyNewTeam)
      .set({ authorization: 'Bearer: ' + body.token });

    expect(httpRequest.status).to.eq(500);
    expect(httpRequest.body).to.deep.eq({ message: "Something went wrong" })
  })
});
