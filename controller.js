const base = require('./airtable.js');

require('dotenv').config();
const axios = require('axios');
const AIRTABLE_BASE_ID = process.env.BASE_ID;
const AIRTABLE_TABLE_NAME = 'Demo';

const table = base(AIRTABLE_TABLE_NAME);

exports.createData = async (req, res) => {
  let data = req.body;
  // Check if the request body is empty
  if (Object.keys(data).length === 0) {
    return res.status(400).json({ 
      status: 'error', 
      error: 'Request body is empty' 
    });
  }
  try { 
    await table.create(data, (err, record) => {
      if (err) { 
        console.error(err); 
        res.status(422).json({ 
          status: 'error',
          error: "Unprocessable",
          message: err.message
        });
        return; 
      }
      res.json({
        status: 'success',
        message: 'Record created successfully',
        data: data,
      });
    });
    
  } catch (err) {
    console.error('Error creating data:', err);
    res.status(500).json({ 
      status: 'error',
      message: 'Internal Server Error' 
    });
  }
};


// Using Airtable through SDK method
exports.fetchDataFromAirtable = async (req, res) => {
  try {
    // Fetch records from the table
    const records = await table.select().firstPage();

    // Extract the necessary data from the records
    let data = records.map((record) => ({
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

    let data = {
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


exports.updateData = async (req, res) => {
  let data = req.body;
  let { id } = req.params;
  if (Object.keys(data).length === 0) {
    return res.status(400).json({ 
      status: 'error', 
      error: 'Request body is empty' 
    });
  }
  try { 
    await table.update(id, data, (err, record) => {
      if (err) {
        if (err.statusCode == 404 ) return res.status(404).json({ error: 'Invalid ID' });
        console.error(err); 
        res.status(422).json({ 
          status: 'error',
          error: "Unprocessable",
          message: err.message
        });
        return; 
      }
      res.json({
        status: 'success',
        message: 'Record updated successfully',
      });
    });
    
  } catch (err) {
    console.error('Error creating data:', err);
    res.status(500).json({ 
      status: 'error',
      message: 'Internal Server Error' 
    });
  }
};


exports.deleteData = async (req, res) => {
  let { id } = req.params;

  try { 
    await table.destroy(id, (err, record) => {
      if (err) {
        console.error(err); 
        res.status(404).json({ 
          status: 'error',
          error: "resource not found",
          message: "Invalid ID"
        });
        return; 
      }
      res.json({
        status: 'success',
        message: 'Record deleted successfully',
      });
    });
    
  } catch (err) {
    console.error('Error creating data:', err);
    res.status(500).json({ 
      status: 'error',
      message: 'Internal Server Error' 
    });
  }
};

