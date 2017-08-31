'use strict';

const uuid = require('uuid');
const dynamodb = require('../../lib/dynamodb');

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.text !== 'string') {
    console.error('Validation Failed');
    callback(new Error("Couldn't create the todo item."));
    return;
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
      callback(new Error("Couldn't create the todo item."));
      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    };
    callback(null, response);
  });
};
