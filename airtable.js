const Airtable = require('airtable');
require('dotenv').config();

const apiKey = process.env.API_KEY;
const baseId = process.env.BASE_ID;

// Initialize Airtable with your API key and base ID
const base = new Airtable({ apiKey: apiKey }).base(baseId);

// const {config} = require('dotenv');
// config()

    
module.exports = base;