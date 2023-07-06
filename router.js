const router = require('express').Router();
const controller = require('./controller.js');

router
    .get('/', controller.fetchDataFromAirtable)
    .get('/search', controller.search)
    .get('/:id', controller.getDataById)
    .post('/', controller.createData)
    .patch('/:id', controller.updateData)
    .delete('/:id', controller.deleteData)

module.exports = router;