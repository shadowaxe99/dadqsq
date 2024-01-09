const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const testDatabaseURL = process.env.TEST_DATABASE_URL;
const testPort = process.env.TEST_PORT || 5001;

beforeAll(async () => {
  await mongoose.connect(testDatabaseURL, { useNewUrlParser: true, useUnifiedTopology: true });
  app.listen(testPort);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Authentication Tests', () => {
  const testUser = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'Password123!'
  };

  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    await User.create({ ...testUser, password: hashedPassword });
  });

  test('POST /api/auth/register - User Registration', async () => {
    const newUser = {
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'Password123!'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  test('POST /api/auth/login - User Login Success', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('POST /api/auth/login - User Login Failure', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: 'wrongpassword'
      });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error');
  });

  test('POST /api/auth/login - User Not Found', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'Password123!'
      });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
});