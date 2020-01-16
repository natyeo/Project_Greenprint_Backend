const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');

chai.use(chaiHttp);
chai.should();

describe('flights post', () => {
  it('should return a 200 code', (done) => {
    chai.request(app)
    .post('/flights')
    .type('form')
    .send({
      "from": "DXB",
      "to": "SYD"
    })
    .then((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
  });
});
