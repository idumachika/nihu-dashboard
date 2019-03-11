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
};

export {ListUserservice};


