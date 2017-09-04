'use strict';

const uuid = require('uuid');
const dynamodb = require('../lib/dynamodb');
const { buildHandlerError } = require('../common/requestHelpers');

/**
 * delete existing report
 */
module.exports.deleteReport = reportId => {
  return new Promise(function(resolve, reject) {
    var params = {
      TableName: process.env.DYNAMODB_TABLE,
      Key: {
        id: reportId
      }
    };

    console.log('delete report with id:' + reportId);

    dynamodb.delete(params, function(err, data) {
      if (err) {
        console.error('failed to delete report ' + err);
        reject(buildHandlerError(500, 'Failed to delete report'));
      }

      const result = {
        statusCode: 200,
        body: JSON.stringify(data)
      };

      resolve(result);
    });
  });
};
