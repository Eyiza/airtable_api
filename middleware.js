require('dotenv').config();

const AIRTABLE_API_KEY = process.env.API_KEY;

// Middleware to check the presence of required headers
function headerCheckerMiddleware(req, res, next) {
    const apiKey = req.headers['airtable-key'];
    if (!apiKey || apiKey !== AIRTABLE_API_KEY) {
      return res.status(401).json({ 
        status: 'error',
        error: 'Invalid API key' 
    });
    }
    next();
};

module.exports = headerCheckerMiddleware;
