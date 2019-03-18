import {ApiService} from "./api.service";

const AddAdminService = {
    addadmin: async ({username, email, password, display_name}) => {
        return await ApiService.post('/super/account/add', {username:username, email:email,password:password,display_name:display_name}).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    // addadmin: ({username, email, password, display_name,}) => {
    //     return new Promise(function (resolve, reject) {
    //         ApiService.post('/super/account/add', {username:username, email:email,password:password,display_name:display_name}).then(async (res) => {
    //             let token = res.data.data;
    //             resolve(token);
    //         }).catch((error) => {
    //             reject(error.response.data);
    //         });
    //     });
        
    // },
};



export {AddAdminService};


