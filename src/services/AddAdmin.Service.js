import {ApiService} from "./api.service";

const AddAdminService = {
    addadmin: async () => {
        return await ApiService.post("/super/account/add").then((res) => {
            window.console.log(res.data.data);
            return Promise.resolve(res.data.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
};

export {AddAdminService};