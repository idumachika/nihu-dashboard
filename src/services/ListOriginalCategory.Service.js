import {ApiService} from "./api.service";

const ListOriginalCategoryService = {
    listcategory: async () => {
        return await ApiService.get('/admin/original/list-category').then((res) => {
            window.console.log(res.data.data);
            return Promise.resolve(res.data.message);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    deleteOriginal: async (adminId) => {
        return await ApiService.get('/admin/original/delete-category'+adminId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    editOriginalCategory: async (adminId) => {
        return await ApiService.post('/admin/original/edit-category/'+adminId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    viewOriginalCategory: async (adminId) => {
        return await ApiService.get('/admin/original/category-detail/'+adminId).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    
};

export {ListOriginalCategoryService};