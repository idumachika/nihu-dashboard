import {ApiService} from "./api.service";

const ListMusicservice = {
    listmusic: async () => {
        return await ApiService.get('/admin/music/list-music').then((res) => {
            window.console.log(res.data.data);
            return Promise.resolve(res.data.message);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    deleteMusic: async (adminId,index) => {
        return await ApiService.get('/admin/music/delete-music/'+adminId).then((res) => {
            this.adminId.splice(index, 1);
            return Promise.resolve(res.data);
            

        }).catch(() => {
            return Promise.reject(false);
        });
    },

    editMusic: async (adminId) => {
        return await ApiService.post('/admin/music/edit-music/'+adminId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    viewMusic: async (adminId) => {
        return await ApiService.get('/admin/music/music-detail/'+adminId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
};

export {ListMusicservice};