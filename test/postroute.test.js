const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');

chai.use(chaiHttp);
chai.should();

describe('post route requests', () => {
  it('should return a 200 code', () => {
    chai.request(app)
    .post('/')
    .type('form')
    .send({
      "from": "London",
      "to": "Paris"
    })
    .then((res) => {
      expect(res).to.have.status(200);
    })
    .catch((err) => {
      throw err;
    })
  });

  it('should return an object', () => {
    chai.request(app)
    .post('/')
    .type('form')
    .send({
      "from": "London",
      "to": "Paris"
    })
    .then((res) => {
      expect(res).to.be.a('object');
    })
    .catch((err) => {
      throw err;
    })
  });

  it('should return the right json', () => {
    chai.request(app)
    .post('/')
    .type('form')
    .send({
      "from": "London",
      "to": "Paris"
    })
    .then((res) => {
      expect(res).to.include({ "distance": "293", "travel_time": "5 hours 47 mins", "mode": "driving", "carbon": "121.59", "url": "https%3A%2F%2Fwww.google.com%2Fmaps%2Fembed%2Fv1%2Fdirections%3Fkey%AIzaSyA4KOWe1DeRtM-CMj_qwfqrJAHHUChQnTQ%26origin%3DLondon%26destination%3DParis%26mode%3Ddriving" });
    })
    .catch((err) => {
      throw err;
    })
  })

  it('should error if something is wrong', () => {
    chai.request(app)
    .post('/')
    .type('form')
    .send({
      "from": "London",
      "to": "Rome"
    })
    .then((res) => {
      expect(res).to.include({ "distance": "not available" })
    })
    .catch((err) => {
      throw err;
    })
  })
});
