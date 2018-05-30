/* global it, describe */
import supertest from 'supertest';
import chai from 'chai';
import 'babel-polyfill';
import app from '../../../app';

const server = app.listen();
const should = chai.should();

const request = supertest.agent(server);

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
          done();
        });
    });

    it('should logout the test user', (done) => {
      request.post('/auth/login')
        .send(userData)
        .expect(200)
        .end();
      request.post('/auth/logout')
        .send(userData.username)
        .expect(200)
        .end((err, res) => {
          res.status.should.eql(200);
          res.body.should.be.a('object');
          res.body.should.have.property('user');
          res.body.should.have.property('msg');
          done();
        });
    });
  });
  //   it('should logout the test user', (done) => {
  //     request.post('/auth/logout')
  //       .send(userData.username)
  //       .expect(200)
  //       .end((err, res) => {
  //         res.status.should.eql(200);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('user');
  //         done();
  //       });
  //   });
  // });

  // it('should suspend the test user', (done) => {
  //   request.post('/auth/register')
  //     .send(userData)
  //     .expect(200)
  //     .end();
  //   request.post('/user/suspend')
  // });
});
