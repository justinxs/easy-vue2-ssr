const path = require('path');
const staticCache = require('koa-static-cache');
const LRU = require('lru-cache');
const files = new LRU({ max: 1000, maxAge: 60 * 1000 });

module.exports = staticCache({
    dir: path.join(__dirname, '../../dist'),
    dynamic: true,
    maxAge: 0,
    gzip: false,
    files: files
});