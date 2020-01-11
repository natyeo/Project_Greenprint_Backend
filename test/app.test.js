const request = require('supertest');
const app = require('../src/app');
var googleMapsQuery = require('../src/app')


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

describe('googleMapsQuery function', () => {
  test('it returns an object with the request', () => {
    req = { 'from': 'Kings Cross', 'to': 'Aldgate' }
    expect(googleMapsQuery(req, 'driving').toEqual({origin: 'Kings Cross', destination: 'Aldgate', units: 'imperial', mode: 'driving'}))
  })
})
