const router = require('express').Router();
const controller = require('./controller.js');

router
    .get('/', controller.fetchDataFromAirtable)
    .get('/:id', controller.getDataById)
    .post('/', controller.createData)

module.exports = router;