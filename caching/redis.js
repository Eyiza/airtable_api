require('dotenv').config();
const base = require('../airtable.js');
const Redis = require('redis');
const table = base('Demo');

const redisClient = Redis.createClient();

redisClient.on("error", (error) => {
    console.error(error);
});

async function getRecordCount() {
  // Check if the record count is already cached in Redis
  redisClient.get('recordCount', async (err, result) => {
    if (result) {
        console.log(result);
        return parseInt(result);
    }
    else {
        // If not cached, fetch the record count from Airtable
        let record = await table.select().all();
        let recordCount = record.length;
        // Cache the result in Redis for future use
        redisClient.set('recordCount', recordCount);
        console.log(recordCount);
        return recordCount;
    }
  })
}

module.exports = {
    getRecordCount
};