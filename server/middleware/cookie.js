
module.exports = async (ctx, next) => {
    const loginName = ctx.cookies.get('LOGIN_NAME');
    
    await next();

    // console.log(ctx.url, ctx.type);
    // 后置响应处理
};