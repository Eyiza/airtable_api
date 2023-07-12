const { errorHandler } = require('../helpers/helper')
const { createData, fetchData, fetchDataById, updateData, deleteData, searchByName } = require('../services/airtable.service');


exports.createData = async (req, res) => {
  try { 
    await createData(req, res);    
  } catch (err) {
    console.error(err);
    return errorHandler(res, 500, 'Internal Server Error');
  }
};

exports.fetchDataFromAirtable = async (req, res) => {
  try {
    await fetchData(req, res);
  } catch (err) {
    console.error('Error retrieving data from Airtable:', err);
    return errorHandler(res, 500, 'Internal Server Error');
  }
};

exports.getDataById = async (req, res) => {
  try {
    await fetchDataById(req, res)
  } catch (err) {
    console.error(err);
    return errorHandler(res, 404, 'Invalid Id' );
  }
}

exports.updateData = async (req, res) => {
  try { 
    await updateData(req, res)
  } catch (err) {
    console.error('Error updating data:', err);
    return errorHandler(res, 500, 'Internal Server Error');
  }
};


exports.deleteData = async (req, res) => {
  try { 
    await deleteData(req, res)
  } catch (err) {
    console.error(err);
    return errorHandler(res, 500, 'Internal Server Error');
  }
};

exports.search = async (req, res) => {
  try {
    await searchByName(req, res)   
  } catch (err) {
    console.error(`Search failed: ${err}`);
    return errorHandler(res, 422, "Unprocessable Entity", `${err}`)
  }
}
