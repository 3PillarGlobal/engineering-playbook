'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const API_HOST = process.env.API_HOST;

chai.use(chaiHttp);

describe('GET Reports', () => {
  beforeEach(done => {
    // do something before each test
    done();
  });

  describe('/GET all reports on empty database', () => {
    it('it should return an empty array response', done => {
      chai
        .request(API_HOST)
        .get('/reports')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body.length.should.be.eq(0);
          done();
        });
    });
  });

  describe('/GET all reports after inserting a new report in DB', () => {
    let reportId;
    before(done => {
      // insert 1 report
      chai
        .request(API_HOST)
        .post('/reports')
        .send({ text: 'Report 1' })
        .end(function(error, response) {
          response.should.have.status(200);
          reportId = response.body.id;
          done();
        });
    });

    it('it should retrieve previously inserted document', done => {
      chai
        .request(API_HOST)
        .get('/reports')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.an('array');
          response.body.length.should.be.eq(1);
          response.body[0].should.have.property('text').eql('Report 1');
          response.body[0].should.have.property('createdAt');
          response.body[0].should.have.property('updatedAt');
          response.body[0].should.have.property('checked');
          response.body[0].should.have.property('id');
          done();
        });
    });

    after(done => {
      // delete inserted report
      chai
        .request(API_HOST)
        .delete('/reports/' + reportId)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });

  describe('/GET all reports after inserting 2 new reports in DB', () => {
    let report1Id, report2Id;
    before(done => {
      // insert 2 reports
      const insertReport1Promise = chai
        .request(API_HOST)
        .post('/reports')
        .send({ text: 'Report 2.1' });

      const insertReport2Promise = chai
        .request(API_HOST)
        .post('/reports')
        .send({ text: 'Report 2.2' });

      Promise.all([insertReport1Promise, insertReport2Promise])
        .then(values => {
          const response1 = values[0];
          const response2 = values[1];
          response1.should.have.status(200);
          report1Id = response1.body.id;
          response2.should.have.status(200);
          report2Id = response2.body.id;
          done();
        })
        .catch(err => {
          console.log('error: ' + err);
        });
    });

    it('it should retrieve previously inserted documents', done => {
      chai
        .request(API_HOST)
        .get('/reports')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.an('array');
          response.body.length.should.be.eq(2);
          done();
        });
    });

    after(done => {
      // delete inserted reports
      const deleteReport1Promise = chai
        .request(API_HOST)
        .delete('/reports/' + report1Id);
      const deleteReport2Promise = chai
        .request(API_HOST)
        .delete('/reports/' + report2Id);

      Promise.all([deleteReport1Promise, deleteReport2Promise])
        .then(values => {
          const response1 = values[0];
          const response2 = values[1];
          response1.should.have.status(200);
          response2.should.have.status(200);
          done();
        })
        .catch(err => {
          console.error('Failed to delete reports: ' + err);
        });
    });
  });
});
