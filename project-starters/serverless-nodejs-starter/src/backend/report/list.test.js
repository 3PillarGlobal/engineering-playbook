'use strict';

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

describe('GET Reports', () => {
  beforeEach(done => {
    // do something before each test
    done();
  });

  describe('/GET all reports', () => {
    it('it should GET all reports', done => {
      chai
        .request('http://localhost:3000')
        .get('/reports')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done();
        });
    });
  });
});
