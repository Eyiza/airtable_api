const cron = require('node-cron');
const { mailService } = require('../services/mail.service.js');
const { getRecordCount } = require('../caching/redis.js');

let job;

// Function to start the cron job that runs every 15 minutes
async function startCronJob(req, res) {
    console.log('Cron job started');
    res.send('Cron job started')
    job = cron.schedule('*/15 * * * *', async () => {
    try {   
        let recordCount = await getRecordCount();
        console.log(`Record count: ${recordCount}`);
        mailService(recordCount);
    } catch (err) {
        console.error('Error fetching records:', err);
        }
    })
};

// Function to stop the cron job
function stopCronJob(req, res) {
  if (job) {
    job.stop();
    console.log('Cron job stopped');
    res.send('Cron job stopped');
  }
}


module.exports = {
    start: startCronJob,
    stop: stopCronJob
};