const UserService = require('../service/user');
module.exports = class UserController {
    async login(ctx, next) {
        const { body } = ctx.request;
        const result = await new UserService().login(body);

        return ctx.body = result;
    }
};