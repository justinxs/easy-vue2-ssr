const path = require('path');
const Koa = require('koa');
const Vue = require('vue');
const app = new Koa();
const config = require('../config/server.json');
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8')
});
const context = {
    title: 'hello',
    meta: `
      <meta name="timestamp" content="${Date.now()}">
    `
};
// response
app.use(ctx => {
    const { query, body, querystring } = ctx.request;
    const app = new Vue({
        data: {
            url: ctx.url,
            querystring,
        },
        template: `
            <div id="app">
                <div>访问的 URL 是： {{ url }}</div>
                <div>访问的 querystring 是： {{ querystring }}</div>
            </div>
        `,
    });
    
    renderer.renderToString(app, context, (err, html) => {
        console.log(html);
        if (err) {
            console.log(err)
            ctx.status = 500;
            ctx.body = 'Internal Server Error';
            return;
        }
        ctx.type = 'html';
        ctx.body = html;
    });
    
});

app.listen(config.port, config.host);
console.log('listening http://localhost:' + config.port);