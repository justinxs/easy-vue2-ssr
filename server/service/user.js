module.exports = class UserService {
    async login(params) {
        return {
            code: 200,
            data: params,
            msg: ''
        }
    }
}