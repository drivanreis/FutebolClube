// app/backend/src/tests/Middlewares.test.ts

import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserSL from '../database/models/UserSL';
import UserMK from './mocks/UserMK';

const mock = new UserMK();
chai.use(chaiHttp);
const { expect } = chai;

describe('Middlewares', () => {
  beforeEach(() => sinon.restore())
  it('TOKEN - Retorna uma mensagem? Caso não seja passado o header "authorization"', async () => {

    const httpRequest = await chai.request(app).get('/login/role');

    expect(httpRequest.status).to.eq(401);
    expect(httpRequest.body).to.have.property('message');
    expect(httpRequest.body.message).to.eq('Token not found');
  })
  it('TOKEN - Retorne uma mensagem? Caso seja passado um token invalido', async () => {
    sinon.stub(UserSL, 'findOne').resolves(undefined);
    const httpRequest = await chai.request(app).get('/login/role').set({ authorization: 'baaaadToken' });

    expect(httpRequest.status).to.eq(401);
    expect(httpRequest.body).to.have.property('message');
    expect(httpRequest.body.message).to.eq('Token must be a valid token');

  })
  it('TOKEN - Retorne uma mensagem? Caso seja passado um token valido mas o email não foi encontrado', async () => {
    const mockResolved = UserSL.build(mock.validFindByEmailMocked);
    sinon.stub(UserSL, 'findOne')
      .onFirstCall().resolves(mockResolved)
      .onSecondCall().resolves(undefined);

    const { body } = await chai.request(app).post('/login').send(mock.validFields);
    const httpRequest = await chai.request(app).get('/login/role').set({ authorization: 'Bearer: ' + body.token });

    expect(httpRequest.status).to.eq(401);
    expect(httpRequest.body).to.have.property('message');
    expect(httpRequest.body.message).to.eq('Token must be a valid token');
  })

  it('TOKEN - Retornado a "role" do usuario? Caso seja passado um token valido.', async () => {
    const mockResolvedToken = UserSL.build(mock.validFindByEmailMocked);
    const mockResolvedUser = UserSL.build(mock.invalidFindByEmailMocked);

    sinon.stub(UserSL, 'findOne')
      .onFirstCall().resolves(mockResolvedToken)
      .onSecondCall().resolves(mockResolvedUser);

    const { body } = await chai.request(app).post('/login').send(mock.validFields);
    const httpRequest = await chai.request(app).get('/login/role').set({ authorization: 'Bearer: ' + body.token });

    expect(httpRequest.status).to.eq(200)
    expect(httpRequest.body).to.have.property('role');
    expect(httpRequest.body.role).to.eq('admin');
  })
});
