const swagger = require('./swagger');
const components = require('./components');
const apis = require('./apis');

module.exports = {
    ...swagger,
    ...components,
    ...apis
};