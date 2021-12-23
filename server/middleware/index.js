const errorMiddleware = require('./error');
const cookieMiddleware = require('./cookie');
const uploadMiddleware = require('./upload');
const bodyparserMiddleware = require('./bodyparser');
const staticMiddleware = require('./static');

module.exports = app => {
    app.use(errorMiddleware);
    app.use(cookieMiddleware);
    app.use(staticMiddleware);
    app.use(uploadMiddleware);
    app.use(bodyparserMiddleware);
};