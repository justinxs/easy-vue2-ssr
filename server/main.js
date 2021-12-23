const Koa = require('koa');
const app = new Koa();
const config = require('../config/server.json');
const router = require('./route');
const plugins = require('./plugins');
const middleware = require('./middleware');

// 插件
plugins(app);

// koa中间件
middleware(app);

// 路由中间件
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port, config.host);
console.log('listening http://localhost:' + config.port);