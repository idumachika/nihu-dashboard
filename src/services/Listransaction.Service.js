import {ApiService} from "./api.service";

const listtransactionservice = {
    listtransaction: async () => {
        return await ApiService.get("/payments/list").then((res) => {
            window.console.log(res.data.data);
            return Promise.resolve(res.data.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
};

export {paymentService};