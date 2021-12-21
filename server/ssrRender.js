const path = require('path');
const fs = require('fs');
const LRU = require('lru-cache');
const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');
const template = fs.readFileSync(path.resolve(__dirname, './template/index.html'), 'utf-8');
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


module.exports = async function ssrRender(_context) {
    const ctx = this;
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
        title: '',
        meta: `<meta name="timestamp" content="${Date.now()}">`,
        link: `<link rel="manifest" href="/manifest.json">`
    };

    return renderer.renderToString(Object.assign(context, _context))
        .then(html => {
            if (cacheable) {
                microCache.set(ctx.url, html);
            }
            ctx.type = 'html';
            ctx.body = html;
        }).catch(err => {
            if (err.code === 404) {
                ctx.status = 404;
                ctx.body = 'Page not found';
            } else {
                ctx.status = 500;
                ctx.body = 'Internal Server Error';
            }
        });
}