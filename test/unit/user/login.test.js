import supertest from 'supertest';
// import chai from 'chai';
import 'babel-polyfill';
import app from '../../../app';

// const expect = chai.expect;

const request = supertest(app.listen());

describe('Start Testing Login function POST Request', () => {
  const userData = {
    username: 'test@test.com',
    password: 111111,
  };

  it('Fail To Register User', (done) => {
    request
      .post('/auth/register')
      .expect(200)
      .expect({
        data: {
          error: '',
        },
      })
      .end(done);
  });

  it('success create user', (done) => {
    request
      .post('/auth/test')
      .send(userData)
      .expect(200)
      .expect({
        data: {
          email: userData.email,
        },
      })
      .end(done);
  });
});
