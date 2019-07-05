/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../app');

const api = supertest(app);
const testHelper = require('../test_helper');

describe('users route', () => {
  beforeEach(async () => {
    await testHelper.setupUserDB();
  });

  describe('user creation', () => {
    test('able to create a new user', async () => {
      const usersAtStart = await testHelper.usersInDB();

      const newUser = {
        name: 'Joe Franklin',
        username: 'joefranklin',
        password: 'password123',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await testHelper.usersInDB();
      expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

      const usernames = usersAtEnd.map(user => user.username);
      expect(usernames).toContainEqual(newUser.username);
    });

    test('username must be unique', async () => {
      const usersAtStart = await testHelper.usersInDB();

      const newUser = {
        username: 'root',
        name: 'Copy Cat',
        password: 'mypassword',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await testHelper.usersInDB();

      expect(usersAtStart.length).toBe(usersAtEnd.length);
    });

    test('password < 3 characters fails', async () => {
      const usersAtStart = await testHelper.usersInDB();

      const newUser = {
        name: 'Sally Anne',
        password: 'ab',
        username: 'sallyanne',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await testHelper.usersInDB();

      expect(usersAtEnd.length).toBe(usersAtStart.length);
    });

    test('username < 3 characters fails', async () => {
      const usersAtStart = await testHelper.usersInDB();

      const newUser = {
        name: 'Joe Franklin',
        username: 'jo',
        password: 'password123',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await testHelper.usersInDB();

      expect(usersAtStart.length).toBe(usersAtEnd.length);
    });
  });

  describe('get requests', () => {
    test('able to get all users', async () => {
      const users = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(users.body.length).toBe(1);
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
