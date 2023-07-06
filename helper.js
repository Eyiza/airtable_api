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

function format(record) {
  return {
    "id": record.id,
    "name": record.fields['Name'],
    "level": record.fields['Level'],
    "DOB": record.fields['DOB'],
    "age": record.fields['Age']
  }
}

module.exports = {
    isRequestBodyEmpty,
    errorHandler,
    successHandler, 
    format
}