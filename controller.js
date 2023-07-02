const base = require('./airtable.js');

require('dotenv').config();
const axios = require('axios');
const AIRTABLE_BASE_ID = process.env.BASE_ID;
const AIRTABLE_TABLE_NAME = 'Demo';

// Using Airtable through SDK method
exports.fetchDataFromAirtable = async (req, res) => {
  try {
    // Specify your Airtable table name
    const table = base('Demo');

    // Fetch records from the table
    const records = await table.select().firstPage();

    // Extract the necessary data from the records
    const data = records.map((record) => ({
      id: record.id,
      name: record.get('Name'),
      level: record.get('Level'),
      DOB: record.get('DOB'),
      age: record.get('Age')
    }));

    // Send the data as the API response
    res.json({
      status: 'success',
      message: 'Data fetched successfully',
      data: data,
    });
  } catch (err) {
    console.error('Error retrieving data from Airtable:', err);
    res.status(500).json({ 
      status: 'error',
      message: 'Internal Server Error' 
    });
  }
};

// Using Airtable through API method
exports.getDataById = async (req, res) => {
  let { id } = req.params;
  const AIRTABLE_API_KEY = req.headers['airtable-key'];
  try {
    const response = await axios(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          "Content-Type": "application/json"
        },
      }
    );

    const record = await response.data;

    const data = {
      id: record.id,
      name: record.fields['Name'],
      level: record.fields['Level'],
      DOB: record.fields['DOB'],
      age: record.fields['Age']
    };

    res.json({
      status: 'success',
      message: 'Data fetched successfully',
      data: data,
    });
  } catch (err) {
    console.error('Error retrieving data from Airtable:', err);
    res.status(500).json({ 
      status: 'error',
      message: 'Internal Server Error' 
    });
  }
}