module.exports = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        console.error(`[service error]: ${error.message}`);
        ctx.status = 500;
        ctx.body = 'Internal Server Error';
    }
};