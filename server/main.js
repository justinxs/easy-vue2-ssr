process.env.NODE_ENV = process.env.NODE_ENV || 'production'; // 在 2.5.0+ 版本中，嵌入式 script 也可以在生产模式 (production mode) 下自行移除
const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const Router = require('koa-router');
const LRU = require('lru-cache');
const app = new Koa();
const router = new Router();
const config = require('../config/server.json');
const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');
const template = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
const microCache = new LRU({
    max: 100,
    maxAge: 1000 // 重要提示：条目在 1 秒后过期。
});

const isCacheable = ctx => {
    // 实现逻辑为，检查请求是否是用户特定(user-specific)。
    // 只有非用户特定 (non-user-specific) 页面才会缓存
    return false;
};

const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false, // 推荐
    template, // （可选）页面模板
    clientManifest, // （可选）客户端构建 manifest
    inject: false
});

console.log(process.env.NODE_ENV || 'production')

// 静态资源转发
router.get(/.*\.(js|css|png|jpg|jpeg|gif|webp|ico|xml|xsl|txt|mp3|zip|htc|swf|json|svga|heic|ttf|woff)/, async (ctx, next) => {
    let lastPoint = ctx.path.lastIndexOf('.');
    let resPath = path.resolve(__dirname, `../dist/${ctx.path}`);
    ctx.type = ctx.path.substr(lastPoint + 1);
    if(fs.existsSync(resPath)) {
        return ctx.body = fs.createReadStream(resPath);
    } else {
        ctx.resError = 1;
        ctx.status = 404;
        return ctx.body = '';
    }
});

router.all(/.*/, async (ctx, next) => {
    const cacheable = isCacheable(ctx);
    if (cacheable) {
        const hit = microCache.get(ctx.url);
        if (hit) {
            ctx.type = 'html';
            ctx.body = hit;
            return;
        }
    }
    const context = {
        url: ctx.url,
        title: 'hello',
        meta: `<meta name="timestamp" content="${Date.now()}">`
    };
    const { err, html } = await new Promise((resolve, reject) => {
        renderer.renderToString(context, (err, html) => resolve({ err, html }))
    });

    if (err) {
        if (err.code === 404) {
            ctx.status = 404;
            ctx.body = 'Page not found';
        } else {
            ctx.status = 500;
            ctx.body = 'Internal Server Error';
        }
    } else {
        if (cacheable) {
            microCache.set(ctx.url, html);
        }
        ctx.type = 'html';
        ctx.body = html;
    }
    
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(config.port, config.host);
console.log('listening http://localhost:' + config.port);