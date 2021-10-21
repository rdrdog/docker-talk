const request = require('supertest');
const app = require('./app.js');

describe('on GET /', () => {
  it('should return a hello world message', async () => {
    const res = await request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .send();

    expect(res.body.message).toContain('The 9000 series');
  });
});
