/**
 * Helper to build a custom error resposne to be handed back to the lambda.
 * 
 * If the error contains a statusCode, means that a custom error 
 * status was crafted. Otherwise, it is just an internal server error.
 */
module.exports.buildLambdaErrorResponse = err => {
  const statusCode = err.statusCode ? err.statusCode : 500;
  const errorMessage = err.statusCode
    ? err.errorMessage
    : 'Internal server error';
  return {
    statusCode: statusCode,
    body: JSON.stringify({ errorMessage: errorMessage })
  };
};

/**
 * Build a custom HTTP errorous result
 */
module.exports.buildHandlerError = (statusCode, errorMessage) => {
  return { statusCode, errorMessage };
};
