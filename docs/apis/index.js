const getRecords = require('./get-records');
const getRecord = require('./get-record');
const createRecord = require('./create-record');
const updateRecord = require('./update-record');
const deleteRecord = require('./delete-record');
const searchRecords = require('./search-records')

module.exports = {
    paths:{
        '/api/airtable':{
            ...getRecords,
            ...createRecord
        },
        '/api/airtable/{id}':{
            ...getRecord,
            ...updateRecord,
            ...deleteRecord
        },
        '/api/airtable/search':{
            ...searchRecords
        }
    }
}