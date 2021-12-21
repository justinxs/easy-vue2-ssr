
module.exports = async (ctx, next) => {
    const loginName = ctx.cookies.get('LOGIN_NAME');

    await next();

    ctx.cookies.set('LOGIN_NAME', loginName || 'admin', {
        domain: ctx.headers['x-host'] || ctx.hostname, // 写cookie所在的域名
        path: '/',       // 写cookie所在的路径
        maxAge: 1000 * 60 * 60 * 24 * 365,   // 1年失效
    });
};