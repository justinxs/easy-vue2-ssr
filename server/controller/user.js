const UserService = require('../service/user');
module.exports = class UserController {
    async login(ctx, next) {
        const { body } = ctx.request;
        const result = await new UserService().login(body);
        
        ctx.cookies.set('LOGIN_NAME', encodeURIComponent(body.name), {
            domain: ctx.headers['x-host'] || ctx.hostname,
            path: '/',
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });
        
        return ctx.body = result;
    }
};