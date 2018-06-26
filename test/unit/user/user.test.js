/* global it, describe */
import supertest from 'supertest';
import chai from 'chai';
import 'babel-polyfill';
import app from '../../../app';

const server = app.listen();
const should = chai.should();

const request = supertest.agent(server);

let testToken;

describe('Start testing user function', () => {
  describe('Start testing user login', () => {
    const userData = {
      username: 'test@test.com',
      password: '111111',
    };
    it('should login the test user', (done) => {
      request.post('/auth/login')
        .send(userData)
        .expect(200)
        .end((err, res) => {
          res.status.should.eql(200);
          res.body.should.be.a('object');
          res.body.should.have.property('msg');
          res.body.should.have.property('user');
          res.body.should.have.property('token');
          testToken = `Bearer ${res.body.token}`;
          done();
        });
    });
    it('should get the user data', (done) => {
      request
        .get('/user')
        .set('Authorization', testToken)
        .end((err, res) => {
          res.status.should.eql(200);
          res.body.should.have.property('_id');
          res.body.should.have.property('username');
          done();
        });
    });
    /*
     *get the login token and try to use it then logout and try to use it again
     */
    // it('should logout the test user', (done) => {
    //   request.post('/auth/login')
    //     .send(userData)
    //     .expect(200)
    //     .end((err, res) => {
    //       const token = res.body.property('token');
    //     });
    //   request.post('/auth/logout')
    //     .send(userData.username)
    //     .expect(200)
    //     .end((err, res) => {
    //       res.status.should.eql(200);
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('user');
    //       res.body.should.have.property('msg');
    //       done();
    //     });
    // });
  });
});
