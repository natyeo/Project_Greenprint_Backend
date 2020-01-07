const request = require('supertest');
const app = require('../src/app');

describe('Test the root path', () => {
  test('It should response the GET method', (done) => {
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('It should push back JSON', (done) => {
    request(app).get('/').then((response) => {
      expect(response.body).toEqual({"thing": "somethingElse"});
      done();
    });
  });
});

describe('Test the root post path', () => {
  test('It should push back JSON for a post request', (done) => {
    request(app).post('/').send({"from": "London", "to": "Paris"}).then((response) => {
      expect(response.body).toEqual({"from": "London", "to": "Paris"})
      done();
    });
  });
});
