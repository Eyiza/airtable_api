const { isRequestBodyEmpty, errorHandler, successHandler } = require('./helper')
const axios = require('axios');

// Create data
async function createData(table, data, res) {  
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
async function fetchData(table, res) {
    const records = await table.select().firstPage();
    let data = records.map((record) => ({
        id: record.id,
        name: record.get('Name'),
        level: record.get('Level'),
        DOB: record.get('DOB'),
        age: record.get('Age'),
    }));
    successHandler(res, 200, 'Data fetched successfully', data)
}

async function fetchDataById(BASE_ID, API_KEY, TABLE_NAME, id, res) {
    const response = await axios.get(
        `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}/${id}`,
        {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
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
}

// Update data in Airtable
async function updateData(table, id, data, res) {
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
async function deleteData(table, id, res) {
    await table.destroy(id, (err, record) => {
      if (err) {
        console.error(err);
        return errorHandler(res, 404, 'Invalid Id');
      }
      successHandler(res, 200, 'Record deleted successfully')
    });
}

module.exports = {
    createData,
    fetchData,
    fetchDataById,
    updateData,
    deleteData
};
