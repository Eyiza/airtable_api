const router = require('express').Router();
const airtableController = require('./controllers/airtable_controller.js');
const cronController = require('./controllers/cronjob_controller.js')

router
    .get('/start-cron', cronController.start)
    .get('/stop-cron', cronController.stop)
    .get('/', airtableController.fetchDataFromAirtable)
    .get('/search', airtableController.search)
    .get('/:id', airtableController.getDataById)
    .post('/', airtableController.createData)
    .patch('/:id', airtableController.updateData)
    .delete('/:id', airtableController.deleteData)

module.exports = router;