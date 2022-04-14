const Router = require('koa-router');
const router = new Router();

const routerMap = {
    controllers: {},
    modules: {
        user: {
            routes: require('./modules/user'),
            Controller: require(`../controller/user`)
        },
        page: {
            routes: require('./modules/page'),
            Controller: require(`../controller/public`),
        }
    },
    getCtr(namespace) {
        if (this === routerMap) {
            if (this.controllers[namespace]) {
                return this.controllers[namespace];
            } else if(this.modules[namespace]) {
                const controller = new this.modules[namespace].Controller();
                return this.controllers[namespace] = controller;
            }
        }
    },
};

Object.keys(routerMap.modules).forEach(namespace => {
    const routes = routerMap.modules[namespace].routes;
    const controller = routerMap.getCtr(namespace);
    routes.forEach(({ method, path, action }) => {
        const actionArr = action.split(':');
        const cAction = actionArr[1] || actionArr[0];
        router[method](path, controller[cAction].bind(controller));
    });
});

const pageController = routerMap.getCtr('page');

router.get(/.*/, pageController.page.bind(pageController));

module.exports = router;