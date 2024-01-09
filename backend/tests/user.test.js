const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const testDatabaseURL = process.env.TEST_DATABASE_URL;
const testPort = process.env.TEST_PORT || 5001;

describe('User API Endpoints', () => {
  let server;
  let testUser;
  let token;

  beforeAll(async () => {
    await mongoose.connect(testDatabaseURL, { useNewUrlParser: true, useUnifiedTopology: true });
    server = app.listen(testPort);
  });

  afterAll(async () => {
    await server.close();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Hash password
    const hashedPassword = await bcrypt.hash('password123', 10);
    // Create a test user
    testUser = await UserModel.create({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
    });
    // Generate a token for the test user
    token = jwt.sign({ userId: testUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  afterEach(async () => {
    // Clean up database after each test
    await UserModel.deleteMany({});
  });

  test('POST /api/auth/register - It should register a new user', async () => {
    const newUser = {
      name: 'New User',
      email: 'newuser@example.com',
      password: 'newpassword123',
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  test('POST /api/auth/login - It should login user and return a token', async () => {
    const userCredentials = {
      email: 'test@example.com',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/auth/login')
      .send(userCredentials);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('GET /api/users/:id - It should return user details', async () => {
    const response = await request(app)
      .get(`/api/users/${testUser._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body._id).toBe(testUser._id.toString());
  });

  test('PUT /api/users/:id - It should update user details', async () => {
    const updatedUser = {
      name: 'Updated User',
      email: 'updated@example.com',
    };

    const response = await request(app)
      .put(`/api/users/${testUser._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedUser);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Updated User');
    expect(response.body).toHaveProperty('email', 'updated@example.com');
  });

  test('DELETE /api/users/:id - It should delete a user', async () => {
    const response = await request(app)
      .delete(`/api/users/${testUser._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(204);
  });
});