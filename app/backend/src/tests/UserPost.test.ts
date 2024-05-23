// app/backend/src/tests/UserPost.test.ts

import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserSL from '../database/models/UserSL';
import UserMK from './mocks/UserMK';

chai.use(chaiHttp);
const mock = new UserMK();

const { expect } = chai;

describe('User - POST / GET', () => {
  beforeEach(() => sinon.restore())

  it('Espera que retorne um token caso seja passado um login valido', async () => {
    const mockResolved = UserSL.build(mock.validFindByEmailMocked);
    sinon.stub(UserSL, 'findOne').resolves(mockResolved);

    const httpRequest = await chai.request(app).post('/login').send(mock.validFields);

    expect(httpRequest.status).to.eq(200);
    expect(httpRequest.body).to.have.property('token');
    expect(typeof httpRequest.body.token).to.eq('string');
  });

  it('Espera que retorne uma mensagem caso seja passado um email invalido ou uma senha invalida', async () => {
    const httpRequest = await chai.request(app).post('/login').send(mock.undefinedFields);


    expect(httpRequest.status).to.eq(400);
    expect(httpRequest.body).to.have.property('message');
    expect(typeof httpRequest.body.message).to.eq('string');
    expect(httpRequest.body.message).to.eq('All fields must be filled')
  })

  it('Espera que retorne uma mensagem caso seja um email invalido ou senha de tamanho inferior a 6', async () => {
    const httpRequest = await chai.request(app).post('/login').send(mock.invalidFields);

    expect(httpRequest.status).to.eq(401);
    expect(httpRequest.body).to.have.property('message');
    expect(typeof httpRequest.body.message).to.eq('string');
    expect(httpRequest.body.message).to.eq('Invalid email or password')
  })

  it('Espera que retorne uma mensagem de erro caso a senha não corresponda com a mesma salva no banco de dados ou não seja encontrado o email passado', async () => {
    const mockResolved = UserSL.build(mock.invalidFindByEmailMocked);
    sinon.stub(UserSL, 'findOne').resolves(mockResolved);

    const httpRequest = await chai.request(app).post('/login').send(mock.validFields);

    expect(httpRequest.status).to.eq(401);
    expect(httpRequest.body).to.have.property('message');
    expect(typeof httpRequest.body.message).to.eq('string');
    expect(httpRequest.body.message).to.eq('Invalid email or password')

  })
});
