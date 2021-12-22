const Router = require('koa-router');
const router = new Router();
const userRoutes = require('./modules/user');
const pageRoutes = require('./modules/page');

const routes = [].concat(pageRoutes, userRoutes);

routes.forEach(({ method, path, action }) => {
    const actionArr = action.split(':');
    const cAction = actionArr[1] || actionArr[0];
    const cName = actionArr[1] ? actionArr[0] : 'public';
    const Controller = require(`../controller/${cName}`);
    const controllerInstance = new Controller();
    router[method](path, controllerInstance[cAction].bind(controllerInstance));
});

module.exports = router;