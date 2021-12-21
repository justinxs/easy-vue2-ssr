const userRoutes = require('./modules/user');
const pageRoutes = require('./modules/page');

const routes = [].concat(pageRoutes, userRoutes);

module.exports = router => {
    routes.forEach(({ method, path, action }) => {
        const [cName, cAction] = action.split(':');
        const Controller = cName ? require(`../controller/${cName}`) : require(`../controller/public`);
        const controllerInstance = new Controller();
        router[method](path, controllerInstance[cAction].bind(controllerInstance));
    });
};