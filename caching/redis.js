const Redis = require('redis');
const Airtable = require('airtable');

// Redis configuration
const redisClient = Redis.createClient();

// Airtable configuration
const airtableBase = new Airtable({ apiKey: 'YOUR_AIRTABLE_API_KEY' }).base('YOUR_AIRTABLE_BASE_ID');
const airtableTable = 'YOUR_AIRTABLE_TABLE_NAME';

async function getRecordCount() {
  // Check if the record count is already cached in Redis
  const cachedCount = await getRecordCountFromCache();
  if (cachedCount !== null) {
    return cachedCount;
  }

  // If not cached, fetch the record count from Airtable
  const count = await fetchRecordCountFromAirtable();

  // Cache the result in Redis for future use
  cacheRecordCount(count);

  return count;
}

async function getRecordCountFromCache() {
  return new Promise((resolve, reject) => {
    redisClient.get('recordCount', (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result !== null ? parseInt(result) : null);
      }
    });
  });
}

async function fetchRecordCountFromAirtable() {
  return new Promise((resolve, reject) => {
    airtableBase(airtableTable).select({ view: 'Grid view' }).firstPage((error, records) => {
      if (error) {
        reject(error);
      } else {
        resolve(records.length);
      }
    });
  });
}

function cacheRecordCount(count) {
  redisClient.set('recordCount', count);
}

module.exports = {
    getRecordCount,
    getRecordCountFromCache,
    fetchRecordCountFromAirtable,
    cacheRecordCount
};