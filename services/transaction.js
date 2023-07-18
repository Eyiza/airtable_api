const { errorHandler, successHandler } = require('../helpers/helper')
const base = require('../config/airtable.js');
const table = base('Demo');
const Record = require('../models/Record.js');
const Duplicate = require('../models/Duplicate.js');
const mongoose = require('mongoose');

let connection = mongoose.connection;

async function addRecordToMongoDB(record, session) {
    await Record.create([record], { session });
    console.log("Created new record successfully!");
}
  
async function addDuplicateToMongoDB(record, session) {
    // await Duplicate.create([record], { session });
    // console.log("Created new duplicate successfully!");
    throw new Error('Error adding duplicate record');
}

async function updateRecordWithTransaction(id, data, res) {   
  // start transaction session
  const session = await connection.startSession();
 
  try {
    await session.startTransaction();
    const record = await table.find(id);
    const updatedRecord = {
      name: record.fields['Name'], 
      level: 'Gamma',
      dob: record.fields['DOB'],
      age: record.fields['Age'],
    };
    await table.update(id, data);

    await addRecordToMongoDB(updatedRecord, session);
    await addDuplicateToMongoDB(updatedRecord, session);
 
    await session.commitTransaction();
    console.log('Transaction committed successfully.');
    successHandler(res, 200, 'Record updated successfully')
  } catch (err) {
    if (err.statusCode == 404) return errorHandler(res, 404, 'Invalid Id');
    console.error('Error in transaction:', err);
    errorHandler(res, 422, 'Unprocessable', err.message);
    if (session) {
        await session.abortTransaction();
        console.log('Transaction aborted.');
      }
  } finally {
    await session.endSession();
    console.log("Ended transaction session");
  }
};

module.exports = {
    updateRecordWithTransaction
};