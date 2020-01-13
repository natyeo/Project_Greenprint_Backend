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

describe('Error testing', () => {
  test('400 error bad request', (done) => {
    request(app).post('/').send({ from: "London", to: "Sydney" }).then((response) => {
      expect(response.body).toEqual({"error": "Bad Request", "description": "Have you considered entering more specific locations?"})
      done();
    })
  })
})
