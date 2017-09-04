'use strict';

const { create } = require('./create');
const { list } = require('./list');
const { deleteReport } = require('./delete');
const {
  buildErrorResponse,
  buildHandlerError
} = require('../common/requestHelpers');

/**
 * Lambda function for the reports module
 */
module.exports.handler = function(event, context, callback) {
  const eventPath = event.requestContext.resourcePath;

  if (eventPath === '/reports' && event.httpMethod === 'POST') {
    create(event.body)
      .then(function(response) {
        callback(null, response);
      })
      .catch(function(err) {
        console.error(err);
        callback(null, buildErrorResponse(err));
      });
  } else if (eventPath === '/reports' && event.httpMethod === 'GET') {
    list()
      .then(function(response) {
        callback(null, response);
      })
      .catch(function(err) {
        console.error(err);
        callback(null, buildErrorResponse(err));
      });
  } else if (eventPath === '/reports/{id}' && event.httpMethod === 'DELETE') {
    deleteReport(event.pathParameters.id)
      .then(function(response) {
        callback(null, response);
      })
      .catch(function(err) {
        console.error(err);
        callback(null, buildErrorResponse(err));
      });
  } else {
    callback(null, buildHandlerError(404, 'Route not found: ' + eventPath));
  }
};
