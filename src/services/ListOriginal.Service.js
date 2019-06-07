import {ApiService} from "./api.service";

const ListOriginalService = {
    listOriginal: async () => {
        return await ApiService.get('/admin/nihutv/list').then((res) => {
            window.console.log(res.data.data);
            return Promise.resolve(res.data.message);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    deleteOriginal: async (adminId) => {
        return await ApiService.get('/admin/nihutv/delete/'+adminId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    editOriginal: async (adminId) => {
        return await ApiService.post('/admin/nihutv/edit/'+adminId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    viewOriginal: async (adminId) => {
        return await ApiService.get('/admin/original/music-original/'+adminId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    
};

export {ListOriginalService};