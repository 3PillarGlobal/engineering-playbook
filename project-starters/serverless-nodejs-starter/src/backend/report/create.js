'use strict';

const uuid = require('uuid');
const dynamodb = require('../lib/dynamodb');

module.exports.create = payload => {
  return new Promise(function(resolve, reject) {
    const timestamp = new Date().getTime();
    const data = JSON.parse(payload);

    if (typeof data.text !== 'string') {
      console.error('Validation Failed. Invalid input data ' + data);
      reject({ statusCode: 400, errorMessage: 'No text data input provided' });
    }

    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: uuid.v1(),
        text: data.text,
        checked: false,
        createdAt: timestamp,
        updatedAt: timestamp
      }
    };

    dynamodb.put(params, error => {
      if (error) {
        console.error(error);
        reject({ statusCode: 400, errorMessage: 'Failed to save into DB' });
      }

      const result = {
        statusCode: 200,
        body: JSON.stringify(params.Item)
      };

      resolve(result);
    });
  });
};
