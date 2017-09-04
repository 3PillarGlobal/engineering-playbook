'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const dynamodb = require('../lib/dynamodb');

const LOCAL_ENV_HOST = 'http://localhost:3000';
const DYNAMO_DB_TABLE_NAME = 'serverless-starter-backend-api-test'; //process.env.DYNAMODB_TABLE is undefined

chai.use(chaiHttp);

describe('GET Reports', () => {
  beforeEach(done => {
    // do something before each test
    done();
  });

  describe('/GET all reports on empty database', () => {
    it('it should return an empty array response', done => {
      chai
        .request(LOCAL_ENV_HOST)
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
        .request(LOCAL_ENV_HOST)
        .post('/reports')
        .send({ text: 'Report 1' })
        .end(function(error, response) {
          response.should.have.status(200);
          reportId = response.body.id;
          console.log('!!!!!' + reportId);
          done();
        });
    });

    it('it should retrieve previously inserted document', done => {
      chai
        .request(LOCAL_ENV_HOST)
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
      var params = {
        TableName: DYNAMO_DB_TABLE_NAME,
        Key: {
          id: reportId
        }
      };
      dynamodb.delete(params, function(err, data) {
        if (err) {
          console.log('failed to delete report ' + err);
        } else {
          console.log('report deleted ');
        }
        done();
      });
    });
  });

  describe('/GET all reports after inserting 2 new reports in DB', () => {
    let report1Id, report2Id;
    before(done => {
      // insert 2 reports
      chai
        .request(LOCAL_ENV_HOST)
        .post('/reports')
        .send({ text: 'Report 2.1' })
        .end(function(error, response) {
          response.should.have.status(200);
          report1Id = response.body.id;
          // done();
        });

      chai
        .request(LOCAL_ENV_HOST)
        .post('/reports')
        .send({ text: 'Report 2.2' })
        .end(function(error, response) {
          response.should.have.status(200);
          report2Id = response.body.id;
          done();
        });
    });

    it('it should retrieve previously inserted documents', done => {
      chai
        .request(LOCAL_ENV_HOST)
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
      var deleteReport1 = {
        TableName: DYNAMO_DB_TABLE_NAME,
        Key: {
          id: report1Id
        }
      };
      dynamodb.delete(deleteReport1, function(err, data) {
        if (err) {
          console.log('failed to delete report 1 ' + err);
        } else {
          console.log('report 1 deleted ');
        }
      });

      var deleteReport2 = {
        TableName: DYNAMO_DB_TABLE_NAME,
        Key: {
          id: report2Id
        }
      };
      dynamodb.delete(deleteReport2, function(err, data) {
        if (err) {
          console.log('failed to delete report 2' + err);
        } else {
          console.log('report 2 deleted ');
        }
        done();
      });
    });
  });
});
