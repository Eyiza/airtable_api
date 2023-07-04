const base = require('./airtable.js');
const { errorHandler } = require('./helper')
const { createData, fetchData, fetchDataById, updateData, deleteData } = require('./services');

require('dotenv').config();
const axios = require('axios');
const AIRTABLE_BASE_ID = process.env.BASE_ID;
const AIRTABLE_TABLE_NAME = 'Demo';

const table = base(AIRTABLE_TABLE_NAME);

exports.createData = async (req, res) => {
  let data = req.body;
  try { 
    await createData(table, data, res);    
  } catch (err) {
    console.error(err);
    return errorHandler(res, 500, 'Internal Server Error');
  }
};

exports.fetchDataFromAirtable = async (req, res) => {
  try {
    await fetchData(table, res);
  } catch (err) {
    console.error('Error retrieving data from Airtable:', err);
    return errorHandler(res, 500, 'Internal Server Error');
  }
};

exports.getDataById = async (req, res) => {
  let { id } = req.params;
  let AIRTABLE_API_KEY = req.headers['airtable-key'];
  try {
    await fetchDataById(AIRTABLE_BASE_ID, AIRTABLE_API_KEY, AIRTABLE_TABLE_NAME, id, res)
  } catch (err) {
    console.error(err.message);
    return errorHandler(res, 404, 'Invalid Id' );
  }
}

exports.updateData = async (req, res) => {
  let data = req.body;
  let { id } = req.params;
  try { 
    await updateData(table, id, data, res)
  } catch (err) {
    console.error('Error updating data:', err);
    return errorHandler(res, 500, 'Internal Server Error');
  }
};


exports.deleteData = async (req, res) => {
  let { id } = req.params;
  try { 
    await deleteData(table, id, res)
  } catch (err) {
    console.error(err);
    return errorHandler(res, 500, 'Internal Server Error');
  }
};

