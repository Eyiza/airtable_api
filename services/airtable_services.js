require('dotenv').config();
const { isRequestBodyEmpty, errorHandler, successHandler, format } = require('../helper')
const axios = require('axios');
const AIRTABLE_BASE_ID = process.env.BASE_ID;
const AIRTABLE_API_KEY = process.env.API_KEY;
const AIRTABLE_TABLE_NAME = 'Demo';
const base = require('../airtable.js');
const table = base(AIRTABLE_TABLE_NAME);

// Create data
async function createData(req, res) {  
    let data = req.body;
    if (isRequestBodyEmpty(data)) {
      return errorHandler(res, 400, 'Request body is empty');
    }
    await table.create(data, (err, record) => {
    if (err) {
        console.error(err);
        return errorHandler(res, 422, 'Unprocessable', err.message);
    }
    successHandler(res, 200, 'Record created successfully', data)
    })
}


// Fetch all data
async function fetchData(req, res) {
    const records = await table.select().all();
    let data = records.map(format)
    successHandler(res, 200, 'Data fetched successfully', data)
}

// Fetch data by id
async function fetchDataById(req, res) {
    let { id } = req.params;
    const response = await axios.get(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${id}`,
        {
        headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`
            },
        }
    );
    
    const record = await response.data;    
    let data = format(record)
    successHandler(res, 200, 'Data fetched successfully', data)
}

// Update data in Airtable
async function updateData(req, res) {
    let data = req.body;
    let { id } = req.params;
    if (isRequestBodyEmpty(data)) {
        return errorHandler(res, 400, 'Request body is empty');
    }
    await table.update(id, data, (err, record) => {
      if (err) {
        if (err.statusCode == 404) return errorHandler(res, 404, 'Invalid Id');
        console.error(err);
        return errorHandler(res, 422, 'Unprocessable', err.message);
      }
      successHandler(res, 200, 'Record updated successfully')
    }); 
}

// Delete data from Airtable
async function deleteData(req, res) {
    let { id } = req.params;
    await table.destroy(id, (err, record) => {
      if (err) {
        console.error(err);
        return errorHandler(res, 404, 'Invalid Id');
      }
      successHandler(res, 200, 'Record deleted successfully')
    });
}

// Search by name
async function searchByName(req, res){
    searchQuery = req.query.name;
    if (!searchQuery) return errorHandler(res, 400, 'Please provide a valid search parameter');
    let filter = {
        filterByFormula: `SEARCH('${searchQuery}', {Name})`
    }
    const records = await table.select(filter).all()
    if (records.length === 0) return successHandler(res, 200, 'No records found' );
    let data = records.map(format)
    successHandler(res, 200, 'Data fetched successfully', data)
}


module.exports = {
    createData,
    fetchData,
    fetchDataById,
    updateData,
    deleteData,
    searchByName
};
