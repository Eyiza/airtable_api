const router = require('express').Router();
const controller = require('./controller.js');

router
    .get('/', controller.fetchDataFromAirtable)
    .get('/:id', controller.getDataById)

module.exports = router;