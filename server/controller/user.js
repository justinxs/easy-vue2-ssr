
module.exports = class UserController {
    async login(ctx, next) {
        const { body } = ctx.request;
        
        return ctx.body = body;
    }
};