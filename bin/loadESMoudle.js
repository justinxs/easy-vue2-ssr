module.exports = function loadESMoudle(modules) {
    return Promise.all(modules.map(mPath => import(mPath).then(m => m.default)));
};