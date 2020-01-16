const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');

chai.use(chaiHttp);
chai.should();

describe('flights route post requests', () => {
  it('should return a 200 code', () => {
    chai.request(app)
    .post('/flights')
    .type('form')
    .send({
      "from": "DXB",
      "to": "SYD"
    })
    .then(function(res) {
      expect(res).to.have.status(200);
    })
    .catch(function(err) {
      throw err;
    });
  });

  it('should return an object', () => {
    chai.request(app)
    .post('/flights')
    .type('form')
    .send({
      "from": "DXB",
      "to": "SYD"
    })
    .then(function(res) {
      expect(res).to.be.a('object');
    })
    .catch(function(err) {
      throw err;
    })
  })

  it('should return the right fields', () => {
    chai.request(app)
    .post('/flights')
    .type('form')
    .send({
      "from": "DXB",
      "to": "SYD"
    })
    .then((res) => {
      expect(res).to.include({"mode": "flying"})
      expect(res).to.include({"origin": "Dubai International"})
      expect(res).to.include({"destination": "Sydney International"})
      expect(res).to.include({"distance": "4028"})
      expect(res).to.include({"carbon": "1957.02"})
      expect(res).to.include({"barrels_of_oil": "4.55"})
    })
  })
});
