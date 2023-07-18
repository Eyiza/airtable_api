const Record = require('../models/Record.js');

exports.updatedRecord = async (req, res) => {
    const updatedRecord = req.body;
    try {
        const record = { 
            name: updatedRecord.name, 
            level: updatedRecord.level,  
            dob: updatedRecord.dob, 
            age: updatedRecord.age 
        }
        const existingRecord = await Record.findOne(record);
    
        if (existingRecord) {
          await Record.updateOne(record, updatedRecord);
        } else {
          await Record.create(updatedRecord);
        }
        res.sendStatus(200); 
    } catch (error) {
        console.error('Error saving record:', error);
        res.sendStatus(500); 
    }
};

