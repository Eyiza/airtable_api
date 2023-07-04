const base = require('./airtable.js');
const { isRequestBodyEmpty, errorHandler, successHandler } = require('./helper');

require('dotenv').config();
const axios = require('axios');
const AIRTABLE_BASE_ID = process.env.BASE_ID;
const AIRTABLE_TABLE_NAME = 'Demo';

const table = base(AIRTABLE_TABLE_NAME);

exports.createData = async (req, res) => {
  let data = req.body;
  if (isRequestBodyEmpty(data)) {
    return errorHandler(res, 400, 'Request body is empty');
  }
  try { 
    await table.create(data, (err, record) => {
      if (err) { 
        console.error(err); 
        return errorHandler(res, 422, 'Unprocessable', err.message);
      }
      successHandler(res, 200, 'Record created successfully', data)
    });
    
  } catch (err) {
    console.error(err);
    return errorHandler(res, 500, 'Internal Server Error');
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
    successHandler(res, 200, 'Data fetched successfully', data)

  } catch (err) {
    console.error('Error retrieving data from Airtable:', err);
    return errorHandler(res, 500, 'Internal Server Error');
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

    successHandler(res, 200, 'Data fetched successfully', data)
  } catch (err) {
    console.error(err.message);
    return errorHandler(res, 404, 'Invalid Id' );
  }
}


exports.updateData = async (req, res) => {
  let data = req.body;
  let { id } = req.params;
  if (isRequestBodyEmpty(data)) {
    return errorHandler(res, 400, 'Request body is empty');
  }
  try { 
    await table.update(id, data, (err, record) => {
      if (err) {
        if (err.statusCode == 404 ) return errorHandler(res, 404, 'Invalid Id' );
        console.error(err); 
        return errorHandler(res, 422, 'Unprocessable', err.message);
      }
      successHandler(res, 200, 'Record updated successfully')
    });
    
  } catch (err) {
    console.error('Error updating data:', err);
    return errorHandler(res, 500, 'Internal Server Error');
  }
};


exports.deleteData = async (req, res) => {
  let { id } = req.params;

  try { 
    await table.destroy(id, (err, record) => {
      if (err) {
        console.error(err); 
        return errorHandler(res, 404, 'resource not found', 'Invalid Id' );
      }
      successHandler(res, 200, 'Record deleted successfully')
    });
    
  } catch (err) {
    console.error(err);
    return errorHandler(res, 500, 'Internal Server Error');
  }
};

