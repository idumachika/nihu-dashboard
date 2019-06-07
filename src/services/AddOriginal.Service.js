import {ApiService} from "./api.service";

const AddOriginalService = {
    addoriginal: async (data) => {
        return await ApiService.post('/admin/nihutv/add', data).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    
};



export {AddOriginalService};


