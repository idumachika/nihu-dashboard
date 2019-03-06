import {ApiService} from "./api.service";

const userService = {
    login: ({username, password}) => {
        return new Promise(function (resolve, reject) {
            ApiService.post('/admin/authenticate', {username: username, password: password}).then(async (res) => {
                let token = res.data.data.token;
                resolve(token);
            }).catch((error) => {
                reject(error.response.data);
            });
        });
    },
    authorize: async (token) => {
        return await ApiService.customRequest({
            headers: {'Authorization': token},
            method: "GET",
            url: ApiService.getBaseUrl() + "/admin/authorize"
        }).then((res) => {
            return Promise.resolve(res.data.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    listpayment: async (token) => {
        return await ApiService.customRequest({
            headers: {'Authorization': token},
            method: "GET",
            url: ApiService.getBaseUrl() + "/payments/list"
        }).then((res) => {
            return Promise.resolve(res.data.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
};

export {userService};