const Koa = require('koa');
const app = new Koa();
const config = require('../config/server.json');
const errorMiddleware = require('./middleware/error');
const cookieMiddleware = require('./middleware/cookie');
const uploadMiddleware = require('./middleware/upload');
const bodyparserMiddleware = require('./middleware/bodyparser');
const staticMiddleware = require('./middleware/static');
const router = require('./route');
const ssrRender = require('./ssrRender');
require('./logger');

app.context.ssrRender = ssrRender;

// koa中间件
app.use(errorMiddleware);
app.use(cookieMiddleware);
app.use(staticMiddleware);
app.use(uploadMiddleware);
app.use(bodyparserMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port, config.host);
console.log('listening http://localhost:' + config.port);