require('dotenv').config();
const base = require('../airtable.js');
const Redis = require('redis');
const table = base('Demo');

const redisClient = Redis.createClient(6379);


redisClient.on("error", (error) => {
    console.error(error);
});

async function getRecordCount() {
    // Connect to Redis
    await redisClient.connect(); 
    const cachedCount = await redisClient.get('recordCount');
    // Check if the record count is already cached in Redis
    if (cachedCount) {
        console.log('result cached');
        return parseInt(cachedCount);
    }
    else {
        console.log('result not cached');
        // If not cached, fetch the record count from Airtable
        let record = await table.select().all();
        let recordCount = record.length;
        // Cache the result in Redis for future use
        redisClient.set('recordCount', recordCount);
        return recordCount;
    }
    
}  


module.exports = {
    getRecordCount
};