import {ApiService} from "./api.service";

const ListAdminservice = {
    ListAdmin: async () => {
        return await ApiService.get('/super/account/list/admin').then((res) => {
            window.console.log(res.data.data);
            return Promise.resolve(res.data.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    upgradeAdmin: async (adminId) => {
        return await ApiService.put('/super/account/upgrade/'+adminId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    
};

export {ListAdminservice};