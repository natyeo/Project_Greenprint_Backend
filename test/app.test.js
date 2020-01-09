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

// ALL OF THESE TEST NEED TO BE FIXED AND UPDATED

// describe('Test the root post path', () => {
//   test('It should return JSON for a post request params', (done) => {
//     request(app).post('/').send({"from": "London", "to": "Paris"}).then((response) => {
//       expect(response.body).toEqual({"from": "London", "to": "Paris"})
//       done();
//     });
//   });
//
//   test('It should return correct JSON for a post request params', (done) => {
//     request(app).post('/').send({"from": "Paris", "to": "Lyon"}).then((response) => {
//       expect(response.body).not.toEqual({"from": "London", "to": "Paris"})
//       done();
//     });
//   });
// });

// describe('Test the google maps API', () => {
//   test('It should convert a call to the google API into the right format of JSON', (done) => {
//     request(app).post('/test-route').send({"from": "London", "to": "Paris"}).then((response) => {
//       expect(response.body).toEqual({})
//       done();
//     });
//   });
// });
