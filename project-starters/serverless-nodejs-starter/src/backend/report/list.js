'use strict';

const dynamodb = require('../lib/dynamodb');

module.exports.list = () => {
  return new Promise(function(resolve, reject) {
    const params = {
      TableName: process.env.DYNAMODB_TABLE
    };

    dynamodb.scan(params, (error, result) => {
      if (error) {
        console.error(error);
        reject({ statusCode: 400, errorMessage: 'Cannot connect to DB' });
      }

      const response = {
        statusCode: 200,
        body: JSON.stringify(result.Items)
      };
      resolve(response);
    });
  });
};
