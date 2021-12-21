const Router = require('koa-router');
const router = new Router();
const apiRouter = require('./api');
const staticRouter = require('./static');

staticRouter(router);
apiRouter(router);

module.exports = router;