const path = require('path');
const fs = require('fs');

module.exports = router => {
    // 静态资源转发
    router.get(/.*\.(js|css|png|jpg|jpeg|gif|webp|ico|xml|xsl|txt|mp3|zip|htc|swf|json|svga|heic|ttf|woff)/, async (ctx, next) => {
        let lastPoint = ctx.path.lastIndexOf('.');
        let resPath = path.resolve(__dirname, `../../dist/${ctx.path}`);
        ctx.type = ctx.path.substr(lastPoint + 1);
        if(fs.existsSync(resPath)) {
            return ctx.body = fs.createReadStream(resPath);
        } else {
            ctx.resError = 1;
            ctx.status = 404;
            return ctx.body = '';
        }
    });
};