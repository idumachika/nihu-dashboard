import {ApiService} from "./api.service";

const paymentService = {
    listpayment: async () => {
        return await ApiService.get("/payments/list").then((res) => {
            window.console.log(res.data.data);
            return Promise.resolve(res.data.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
};

export {paymentService};