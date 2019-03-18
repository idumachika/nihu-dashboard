import {ApiService} from "./api.service";

const paymentService = {
    listpayment: async () => {
        return await ApiService.get("/payments/list").then((res) => {
            return Promise.resolve(res.data.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    querypayment: async (ref) => {
        return await ApiService.get("/payments/query?reference="+ref).then((res) => {
            return Promise.resolve(res.data.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    comfirmPayment: async (ref) => {
        return await ApiService.get("/payments/query?reference="+ref).then((res) => {
            return Promise.resolve(res.data.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
};


export {paymentService};