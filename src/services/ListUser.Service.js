import {ApiService} from "./api.service";

const ListUserservice = {
    ListUser: async () => {
        return await ApiService.get("/admin/list/user").then((res) => {
            window.console.log(res.data.data);
            return Promise.resolve(res.data.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    blockUser: async (userId) => {
        return await ApiService.post('/admin/user/'+userId+'/block').then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    unblockUser: async (userId) => {
        return await ApiService.post('/admin/user/'+userId+'/unblock').then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
};

export {ListUserservice};


