const log4js = require('log4js');
const loggerConfig = {
    appenders: {
        console: {
            type: 'console'
        },
        dateFile: {
            type: 'dateFile',
            filename: 'logs/log.log',
            pattern: 'yyyy-MM-dd',
            compress: false
        }
    },
    categories: {
        default: {
            appenders: ['console', 'dateFile'],
            level: 'debug'
        }
    },
    disableClustering: true
};

log4js.configure(loggerConfig);

const logger = log4js.getLogger('console');

console.debug = logger.debug.bind(logger);
console.log = logger.info.bind(logger);
console.info = logger.info.bind(logger);
console.warn = logger.warn.bind(logger);
console.error = logger.error.bind(logger);

module.exports = logger;