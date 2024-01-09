const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const { CompanyModel, ShareholderModel, EquityGrantModel } = require('../models');
const { connectDB } = require('../config/db');

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('CapTable Endpoints', () => {
  let company;
  let shareholder;
  let equityGrant;

  beforeAll(async () => {
    company = await CompanyModel.create({ name: 'Test Company', totalShares: 1000000 });
    shareholder = await ShareholderModel.create({ name: 'John Doe', email: 'john@example.com' });
    equityGrant = await EquityGrantModel.create({ shareholder: shareholder._id, company: company._id, amount: 10000 });
  });

  afterAll(async () => {
    await CompanyModel.deleteMany({});
    await ShareholderModel.deleteMany({});
    await EquityGrantModel.deleteMany({});
  });

  test('GET /api/captable should display cap table', async () => {
    const res = await request(app).get('/api/captable');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('capTable');
  });

  test('POST /api/captable should create a new cap table entry', async () => {
    const newEntry = {
      shareholder: shareholder._id,
      company: company._id,
      amount: 5000
    };

    const res = await request(app)
      .post('/api/captable')
      .send(newEntry);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
  });

  test('PUT /api/captable/:id should update a cap table entry', async () => {
    const update = { amount: 15000 };

    const res = await request(app)
      .put(`/api/captable/${equityGrant._id}`)
      .send(update);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('amount', 15000);
  });

  test('DELETE /api/captable/:id should delete a cap table entry', async () => {
    const res = await request(app).delete(`/api/captable/${equityGrant._id}`);
    expect(res.statusCode).toEqual(204);
  });
});