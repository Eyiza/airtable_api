require('dotenv').config();
const { errorHandler } = require('./helper');
const AIRTABLE_API_KEY = process.env.API_KEY;

// Middleware to check the presence of required headers
function headerCheckerMiddleware(req, res, next) {
    const apiKey = req.headers['airtable-key'];
    if(!apiKey) {
        return errorHandler(res, 401, 'API key missing');
    }
    if (apiKey !== AIRTABLE_API_KEY) {
        errorHandler(res, 401, 'Invalid API key')
    }
    next();
};

module.exports = headerCheckerMiddleware;
