
module.exports = class publicController {
    async page(ctx, next) {
        const { path, url, request } = ctx;
        const loginName = ctx.cookies.get('LOGIN_NAME');

        if (path !== '/login' && !loginName) {
            return ctx.redirect(`/login?redirect=${url}`);
        } else if (path === '/login' && loginName) {
            return ctx.redirect('/');
        }

        return ctx.ssrRender();
    }
};