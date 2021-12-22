
module.exports = class publicController {
    constructor() {
        this.whiteList = ['/'];
    }

    async page(ctx, next) {
        const { path, url, request } = ctx;
        const loginName = ctx.cookies.get('LOGIN_NAME');
        let ssrContext = {
            loginName,
            whiteList: this.whiteList
        };

        if (path !== '/login' && !loginName) {
            if (!this.whiteList.includes(path)) {
                return ctx.redirect(`/login?redirect=${url}`);
            }
        } else if (path === '/login' && loginName) {
            return ctx.redirect('/');
        }

        if (path === '/') {
            ssrContext.seo = {
                title: 'Home SSR',
                keywords: 'Home SSR',
                description: 'Home SSR'
            };
        }

        return ctx.ssrRender(ssrContext);
    }
};