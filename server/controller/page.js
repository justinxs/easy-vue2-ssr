
module.exports = class pageController {

    async home(ctx, next) {
        return ctx.ssrRender({ title: 'Home' })
    }

    async foo(ctx, next) {
        return ctx.ssrRender({})
    }
};