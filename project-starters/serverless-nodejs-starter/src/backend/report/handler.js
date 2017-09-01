'use strict';

const create = require('./create');
const list = require('./list');

module.exports.handler = function(event, context, callback) {
  if (event.path === '/reports' && event.httpMethod === 'POST') {
    create
      .create(event.body)
      .then(function(response) {
        callback(null, response);
      })
      .catch(function(err) {
        console.error(err);
        callback(null, buildErrorResponse(err));
      });
  } else if (event.path === '/reports' && event.httpMethod === 'GET') {
    list
      .list(callback)
      .then(function(response) {
        callback(null, response);
      })
      .catch(function(err) {
        console.error(err);
        callback(null, buildErrorResponse(err));
      });
  }
};

function buildErrorResponse(err) {
  const statusCode = err.statusCode ? err.statusCode : 500;
  const errorMessage = err.statusCode
    ? err.errorMessage
    : 'Internal server error';
  return {
    statusCode: statusCode,
    body: JSON.stringify({ errorMessage: errorMessage })
  };
}
