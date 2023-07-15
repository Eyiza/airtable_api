const Airtable = require('airtable');
require('dotenv').config();

const apiKey = process.env.API_KEY;
const baseId = process.env.BASE_ID;

const base = new Airtable({ apiKey: apiKey }).base(baseId);

    
module.exports = base;
