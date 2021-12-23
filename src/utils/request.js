import axios from 'axios';

const service = axios.create({
    baseURL: '',
    timeout: 30000,
    withCredentials: false,
    transformResponse: [
        function(data) {
            return JSON.parse(data);
        }
    ]
});

service.interceptors.request.use(
    config => {
        config.params = Object.assign({ v: Date.now() }, config.params);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        return response.data;
    }, 
    error => {
        if (error == 'Error: 网络错误') {
            return Promise.reject(error.message);
        } else {
            return Promise.resolve({ code: 0, msg: error });
        }
    }
);

export default service;
