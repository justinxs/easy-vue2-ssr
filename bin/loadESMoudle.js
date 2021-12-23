module.exports = function loadESMoudle(modules) {
    return Array.isArray(modules) 
        ? Promise.all(modules.map(mPath => import(mPath).then(m => m.default)))
        : import(modules).then(m => m.default);
};