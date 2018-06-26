import supertest from 'supertest';
import chai from 'chai';
import 'babel-polyfill';
import app from '../../../app';

const server = app.listen();
const should = chai.should();

const request = supertest.agent(server);

describe('Start Testing BlockChain Router', () => {
  describe('Start Testing Create a new Block Routing ', () => {
    it('should login the test user', (done) => {
      request.get('/blockchain/chain')
        .expect(200)
        .end((err, res) => {
          res.status.should.eql(200);
          res.body.should.be.a('object');
          res.body.should.have.property('count');
          res.body.should.have.property('blockchain');
          done();
        });
    });
  });
});
