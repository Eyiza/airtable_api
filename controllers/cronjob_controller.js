const base = require('../airtable.js');
const cron = require('node-cron');
const { mailService } = require('../services/mailservice.js');
const table = base('Demo');

let job;

// Function to start the cron job that runs every 15 minutes
function startCronJob(req, res) {
    console.log('Cron job started');
    res.send('Cron job started')
    job = cron.schedule('*/15 * * * *', async () => {
    try {   
        let record = await table.select().all()
        let recordCount = record.length
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