/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/server')();
const config = require('../config');
const userConfig = require('./userConfig');

describe('USER Endpoints', () => {
  it('should fetch all users', async () => {
    const res = await request(app)
      .get('/api/v1/users')
      .set('Authorization', config.access_token);
    expect(res.statusCode).toEqual(200);
  });
});

describe('USER Endpoints', () => {
  it('should fetch specific users', async () => {
    const res = await request(app)
      .get(`/api/v1/users/${userConfig.userId}`)
      .set('Authorization', config.access_token);
    expect(res.statusCode).toEqual(200);
  });
});

describe('USER Endpoints', () => {
  it('should post user', async () => {
    const res = await request(app)
      .post(`/api/v1/users`)
      .set('Authorization', config.access_token)
      .send(userConfig.createPayload);
    expect(res.statusCode).toEqual(200);
  });
});

describe('USER Endpoints', () => {
  it('should update user', async () => {
    const res = await request(app)
      .put(`/api/v1/users/${userConfig.userId}`)
      .set('Authorization', config.access_token)
      .send(userConfig.updatePayload);
    expect(res.statusCode).toEqual(200);
  });
});

// describe('USER Endpoints', () => {
//     it('should delete user', async () => {
//         const res = await request(app)
//             .delete(`/api/v1/users/${userConfig.userId}`)
//             .set('Authorization', config.access_token);
//         expect(res.statusCode).toEqual(204);
//     });
// });