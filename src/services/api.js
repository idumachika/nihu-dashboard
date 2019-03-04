const axios = require('axios');
const ENVIRONMENT = 'production';

const Api = {
    api_host: {
        development: 'http://jive-core.herokuapp.com/api/v1',
        production: 'http://jive-core.herokuapp.com/api/v1',
    },
    apiUrl: () => Api.api_host[ENVIRONMENT],
    authenticateUser: (username, password) => {
        return axios.post(Api.apiUrl() + '/users/login', {
                login: username,
                password: password
            }
        );
    }
};

Object.freeze(Api);

export default Api;