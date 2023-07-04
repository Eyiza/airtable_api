// Helper function to check if the request body is empty
function isRequestBodyEmpty(data) {
  return Object.keys(data).length === 0;
}

// Helper function to handle error responses
function errorHandler(res, statusCode, error, message) {
  return res.status(statusCode).json({ status: 'error', error, message });
}

// Helper function to handle success responses
function successHandler(res, statusCode, message, data) {
  return res.status(statusCode).json({ status: 'success', message, data });
}

module.exports = {
    isRequestBodyEmpty,
    errorHandler,
    successHandler
}