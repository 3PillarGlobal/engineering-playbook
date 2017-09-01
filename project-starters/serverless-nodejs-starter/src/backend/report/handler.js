'use strict';

const { create } = require('./create');
const { list } = require('./list');
const { buildErrorResponse } = require('../common/requestHelpers');

/**
 * Lambda function for the reports module
 */
module.exports.handler = function(event, context, callback) {
  if (event.path === '/reports' && event.httpMethod === 'POST') {
    create(event.body)
      .then(function(response) {
        callback(null, response);
      })
      .catch(function(err) {
        console.error(err);
        callback(null, buildErrorResponse(err));
      });
  } else if (event.path === '/reports' && event.httpMethod === 'GET') {
    list(callback)
      .then(function(response) {
        callback(null, response);
      })
      .catch(function(err) {
        console.error(err);
        callback(null, buildErrorResponse(err));
      });
  }
};
