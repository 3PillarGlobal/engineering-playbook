'use strict';

const dynamodb = require('../lib/dynamodb');
const { buildHandlerError } = require('../common/requestHelpers');

/**
 * list all reports
 */
module.exports.list = () => {
  return new Promise(function(resolve, reject) {
    const params = {
      TableName: process.env.DYNAMODB_TABLE
    };

    dynamodb.scan(params, (error, result) => {
      if (error) {
        console.error(error);
        reject(buildHandlerError(400, 'Cannot connect to DB'));
      }

      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Items)
      };
      resolve(response);
    });
  });
};
