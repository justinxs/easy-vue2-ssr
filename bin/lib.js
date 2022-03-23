const os = require('os');

function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const netName in interfaces) {
        const netGroup = interfaces[netName]
        for (let index = 0; index < netGroup.length; index++) {
            const net = netGroup[index];
            if (net.family === 'IPv4' && net.adress !== '127.0.0.1' && !net.internal) {
                return net.address;
            }
        }
    }
}

function loadESMoudle(modules) {
    return Array.isArray(modules) 
        ? Promise.all(modules.map(mPath => import(mPath).then(m => m.default)))
        : import(modules).then(m => m.default);
}

module.exports = {
    getLocalIP,
    loadESMoudle
}