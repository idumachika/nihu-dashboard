import {ApiService} from "./api.service";

const AddOriginalCategoryService = {
    addoriginal: async (data) => {
        return await ApiService.post('/admin/original/add-category', data).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    
};



export {AddOriginalCategoryService};


