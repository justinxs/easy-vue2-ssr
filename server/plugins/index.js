const loggerPlugin = require('./logger');
const renderPlugin = require('./ssrRender');

module.exports = app => {
    loggerPlugin(app)
    renderPlugin(app)
};