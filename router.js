const router = require('express').Router();
const airtableController = require('./controllers/airtable.controller.js');
const cronController = require('./controllers/cronjob.controller.js')
const webhhokController = require('./controllers/webhook.controller.js')

router
    .get('/start-cron', cronController.start)
    .get('/stop-cron', cronController.stop)
    .get('/', airtableController.fetchDataFromAirtable)
    .get('/search', airtableController.search)
    .get('/:id', airtableController.getDataById)
    .post('/', airtableController.createData)
    .patch('/:id', airtableController.updateData)
    .delete('/:id', airtableController.deleteData)
    .post('/webhook', webhhokController.updatedRecord)

module.exports = router;