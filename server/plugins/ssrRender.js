const path = require('path');
const fs = require('fs');
const LRU = require('lru-cache');
const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('../../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../../dist/vue-ssr-client-manifest.json');
const template = fs.readFileSync(path.resolve(__dirname, '../template/index.html'), 'utf-8');
const microCache = new LRU({
    max: 100,
    maxAge: 1000 // 重要提示：条目在 1 秒后过期。
});
const seoMap = require('../../config/seo.json');

const isCacheable = ctx => {
    // 实现逻辑为，检查请求是否是用户特定(user-specific)。
    // 只有非用户特定 (non-user-specific) 页面才会缓存
    return false;
};

const getSeo = name => ({ ...(seoMap[name] || seoMap['/']) });

const mergeContext = (ctx, options) => {
    const seo = options.seo || getSeo(ctx.path);
    const context = Object.assign({
        url: ctx.url,
        title: '',
        meta: `<meta name="timestamp" content="${Date.now()}">`,
        link: `<link rel="manifest" href="/manifest.json" crossorigin="use-credentials">`
    }, options);
    
    Object.keys(seo).forEach(k => {
        let val = seo[k] || '';
        switch (k) {
            case 'keywords':
            case 'description':
                if (!context.meta) context.meta = '';

                if (val) {
                    context.meta += `<meta name="${k}" content="${val}">`;
                }
                break;
            default:
                context[k] = val;
                break;
        }
    });

    context.seoMap = {
        ...JSON.parse(JSON.stringify(seoMap)),
        [ctx.path]: seo
    };

    return context;
};

const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false, // 推荐
    template, // （可选）页面模板
    clientManifest, // （可选）客户端构建 manifest
    inject: false
});


async function ssrRender(_context) {
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

    const context = mergeContext(ctx, _context);

    return renderer.renderToString(context)
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

module.exports = app => {
    app.context.ssrRender = ssrRender;
};