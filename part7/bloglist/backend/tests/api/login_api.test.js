/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');

const api = supertest(app);
const User = require('../../models/user');

describe('test login', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const user = {
      username: 'root',
      name: 'Joe Walsh',
      password: 'secret',
    };

    await api
      .post('/api/users')
      .send(user);
  });

  test('correct credentials results in successful login', async () => {
    const credentials = {
      username: 'root',
      password: 'secret',
    };

    await api
      .post('/api/login')
      .send(credentials)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('wrong password results in unsuccessful login', async () => {
    const credentials = {
      username: 'root',
      password: 'secret1',
    };

    await api
      .post('/api/login')
      .send(credentials)
      .expect(401)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
