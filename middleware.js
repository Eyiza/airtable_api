require('dotenv').config();
const { errorHandler, calculateSHA256Hash } = require('./helper');
const Authorization = process.env.AUTHORIZATION;

// Middleware to check the presence of required headers
function headerCheckerMiddleware(req, res, next) {
    const Authorization_Key = req.headers['x-airtable'];
    if(!Authorization_Key) {
        return errorHandler(res, 401, 'Authorization key missing');
    }
    const hashedAuthorizationKey = calculateSHA256Hash(Authorization_Key);
    const hashedStoredAuthorization = calculateSHA256Hash(Authorization);
    if (hashedAuthorizationKey !== hashedStoredAuthorization) {
        return errorHandler(res, 401, 'Invalid Authorization key')
    }
    next();
};

module.exports = headerCheckerMiddleware;
