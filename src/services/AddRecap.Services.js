import {ApiService} from "./api.service";

const AddRecapService = {
    addRecap: async (data) => {
        return await ApiService.post('/admin/recap/add', data).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    
};



export {AddRecapService};